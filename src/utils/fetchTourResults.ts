import axios from "axios";
import * as cheerio from "cheerio";
import { parseDate } from "./helpers/parseDate";
import { TourResult } from "./types";

export const fetchTourResults = async (id: string): Promise<TourResult> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API}api/tourney/`;
    const viewUrl = `${baseUrl}view/${id}.html`;

    const [viewUrlResponse, playersResponse, gridResponse] = await Promise.all([
      axios.get(viewUrl),
      axios.get(`${baseUrl}viewplayers/${id}/page1.html`),
      axios.get(`${baseUrl}grid/${id}/10.html`),
    ]);

    const $view = cheerio.load(viewUrlResponse.data);
    const { confirmedPlayersCount } = parseConfirmedPlayersCount(
      playersResponse.data
    );
    const registeredPlayersCount = parseRegisteredPlayersCount($view);
    const tourType = parseTourType($view);
    const tourStart = parseTourStart($view);
    const { top1, top2, firstChoice, secondChoice, numOfRounds } =
      parseGridResults(gridResponse.data);

    return {
      id,
      tourType,
      tourStart,
      title: $view("div.league-start h1").text(),
      registeredPlayersCount,
      confirmedPlayersCount,
      top1,
      top2,
      firstChoice,
      secondChoice,
      numOfRounds,
    };
  } catch (err) {
    console.error("Error fetching tournament results:", err);
    throw err;
  }
};

const parseConfirmedPlayersCount = (data: string) => {
  const $ = cheerio.load(data);
  let confirmedPlayersCount = 0;
  $("div.sort-row").each(function () {
    $(this)
      .children()
      .each(function () {
        if ($(this).text().trim() === "YES") {
          confirmedPlayersCount++;
        }
      });
  });
  return { confirmedPlayersCount };
};

const parseRegisteredPlayersCount = ($: cheerio.CheerioAPI) => {
  return $(".pg-left .field2").last().text().trim().split(" ")[0];
};

const parseTourType = ($: cheerio.CheerioAPI) => {
  return $(".pg-left .t-corp3:nth-child(3) .field2").text().trim();
};

const parseTourStart = ($: cheerio.CheerioAPI) => {
  return parseDate($(".pg-left .t-corp3:nth-child(6) .field2").text().trim());
};

const parseGridResults = (
  data: string
): {
  top1: string[];
  top2: string[];
  firstChoice: string[];
  secondChoice: string[];
  numOfRounds: number;
} => {
  const $ = cheerio.load(data);
  const stages = $('[id^="t"]').children();
  let latestStage: cheerio.Cheerio<cheerio.Element> | null = null;
  stages.each((_, element) => {
    const classAttr = $(element).attr("class");
    if (classAttr && classAttr.startsWith("stage-")) {
      if (!latestStage || $(element).index() > $(latestStage).index()) {
        latestStage = $(element);
      }
    }
  });

  const latestStageClassName = latestStage!.attr("class");

  const top1 =
    latestStage!
      .find(".tplay a.profile-view-link")
      .map((_, elem) => $(elem).text())
      .get() ?? [];

  const top2 = $(
    `.${latestStageClassName?.replace(/\d$/, (num) =>
      String(Number(num) - 1)
    )} .looser .tplay a.profile-view-link`
  )
    .map((_, elem) => $(elem).text())
    .get();

  const top3 = $(
    `.${latestStageClassName?.replace(/\d$/, (num) =>
      String(Number(num) - 2)
    )} .looser .tplay a.profile-view-link`
  )
    .map((_, elem) => $(elem).text())
    .get();

  const numOfRounds = Number(
    $(".round").last().find("a").text().match(/\d+/)![0]
  );

  const halfIndex = Math.ceil(top3.length / 2);
  const firstChoice = top3.slice(0, halfIndex);
  const secondChoice = top3.slice(halfIndex);

  return { top1, top2, firstChoice, secondChoice, numOfRounds };
};
