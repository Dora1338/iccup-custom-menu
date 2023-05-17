import * as cheerio from "cheerio";
import axios from "axios";
import { Tournament } from "./types";

export const fetchFinishedTours = async (): Promise<Tournament[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}api/warcraft/tourney.html`
    );
    const $ = cheerio.load(data);
    const tournaments: Tournament[] = [];

    $(".stady-color-finished").each((_, el) => {
      const tournamentTitle = $(el).siblings(".t-main-title").text().trim();
      const tournamentUrl = $(el)
        .siblings(".t-main-title")
        .children("a")
        .attr("href");
      const id = tournamentUrl?.match(/\d+/)?.[0] ?? "";
      tournaments.push({
        title: tournamentTitle,
        id,
      });
    });

    return tournaments;
  } catch (error) {
    console.error(error);
    return [];
  }
};
