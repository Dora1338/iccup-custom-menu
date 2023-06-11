"use client";

import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { ReportTextarea } from "@/components/ReportTextarea";
import { Switch } from "@/components/Switch";
import { calculateReward } from "@/utils/calculateReward";
import { fetchFinishedTours } from "@/utils/fetchFinishedTours";
import { fetchTourResults } from "@/utils/fetchTourResults";
import { TourResult, Tournament } from "@/utils/types";
import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Home = () => {
  const [reportText, setReportText] = useState("");
  const [results, setResults] = useState<TourResult>();
  const [tournamentsStore, setTournamentsStore] = useState<TourResult>();
  const [rewardEnabled, setRewardEnabled] = useState(false);
  const [thirdPlaceEnabled, setThirdPlaceEnabled] = useState(false);
  const [increasedCupsEnabled, setIncreasedCupsEnabled] = useState(false);
  const [rewardValues, setRewardValues] = useState(["", "", ""]);
  const [tlValue, setTlValue] = useState("0");
  const [thirdPlace, setThirdPlace] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourInProcessModalOpen, setIsTourInProcessModalOpen] =
    useState(false);
  const [isValidTlInput, setIsValidTlInput] = useState(true);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFinishedTours();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchData();
  }, []);

  const generateReportText = ({
    id,
    title,
    tourType,
    registeredPlayersCount,
    confirmedPlayersCount,
    tourStart,
    top1,
    top2,
    numOfRounds,
  }: TourResult) => {
    let reward = calculateReward(
      tourType,
      confirmedPlayersCount - Number(tlValue),
      title,
      numOfRounds - 1
    );

    if (increasedCupsEnabled) {
      reward = reward.map((num, index) => num + [30, 20, 10][index]);
    }

    const top1Players = top1
      .map(
        (res) =>
          `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
            res
          )}.html]${res}[/url]`
      )
      .join(" & ");
    const top2Players = top2
      .map(
        (res) =>
          `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
            res
          )}.html]${res}[/url]`
      )
      .join(" & ");
    const thirdPlaceText = !thirdPlaceEnabled
      ? `[color=green]3 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417982-564.jpg[/img] - ${thirdPlace
          ?.map(
            (res) =>
              `[url=https://iccup.com/dota/profile/view/${encodeURIComponent(
                res
              )}.html]${res}[/url]`
          )
          .join(" & ")} - [color=green]получа${
          tourType !== "1x1" ? "ют по" : "ет"
        } ${rewardEnabled ? rewardValues[2] : reward[2]} капсов[/color]\n`
      : "";

    return setReportText(
      `[center][url=https://iccup.com/tourney/view/${id}.html]${title} [${tourStart}][/url]\n[color=red]1 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417943-564.jpg[/img] - ${top1Players} - [color=red]получа${
        tourType !== "1x1" ? "ют по" : "ет"
      } ${
        rewardEnabled ? rewardValues[0] : reward[0]
      } капсов[/color]\n[color=blue]2 место[/color][img]http://imgs.su/tmp/2013-05-24/1369417968-564.jpg[/img] - ${top2Players} - [color=blue]получа${
        tourType !== "1x1" ? "ют по" : "ет"
      } ${
        rewardEnabled ? rewardValues[1] : reward[1]
      } капсов[/color]\n${thirdPlaceText}[url=https://iccup.com/tourney/grid/${id}.html]Сетка турнира[/url]\nКоличество зарегистрированных ${
        tourType !== "1x1" ? "команд" : "пользователей"
      }: ${registeredPlayersCount}\nКоличество ${
        tourType !== "1x1" ? "команд" : "пользователей"
      } подтвердивших участие: ${confirmedPlayersCount}\nКоличество технических лузов: ${tlValue}\n[img]https://iccup.com/upload/images/news/iCCup.Hardy/uzorchik.png[/img][/center]`
    );
  };

  const handleInputValueChange = (index: number, value: string) => {
    const newInputs = [...rewardValues];
    newInputs[index] = value;
    setRewardValues(newInputs);
  };

  let inputElements = null;

  if (rewardEnabled) {
    inputElements = rewardValues
      .slice(0, !thirdPlaceEnabled ? 3 : 2)
      .map((value, index) => (
        <Input
          key={index}
          label={index + 1 + " место"}
          className="mt-1"
          value={value}
          onChange={(e) => handleInputValueChange(index, e.target.value)}
        />
      ));
  }

  const handleTourChange = (tour: TourResult) => {
    fetchTourResults(tour.id)
      .then((data) => {
        setResults(data);
        setThirdPlace(null);

        if (data.top1.length > 0) {
          setIsModalOpen(true);
        } else if (data.top1.length === 0) {
          setIsTourInProcessModalOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsValidTlInput(tlValue.trim().length > 0 && /^\d+$/.test(tlValue));
  }, [tlValue]);

  useEffect(() => {
    if (results) {
      generateReportText(results);
    }
  }, [rewardValues, increasedCupsEnabled, isModalOpen]);

  return (
    <>
      <div className="flex flex-col pt-5 mb-5">
        <div className="space-y-5">
          <Switch
            label="Я посчитаю награды сам!"
            checked={rewardEnabled}
            onChange={setRewardEnabled}
          />
          <Switch
            label="Повышенные капсы"
            checked={increasedCupsEnabled}
            onChange={setIncreasedCupsEnabled}
          />
        </div>
        {inputElements}
      </div>
      <div className="order-2 w-64 min-w-0 mt-5 hidden xl:block xl:pl-8">
        <ul className="text-sm font-medium text-gray-400 space-y-5">
          {tournaments.map((tour: any, index) => (
            <li key={index}>
              <a
                className="cursor-pointer text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => handleTourChange(tour)}
              >
                {tour.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden">
        <Listbox
          value={tournamentsStore}
          onChange={(selectedTour) => {
            setTournamentsStore(selectedTour);
            handleTourChange(selectedTour);
          }}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm dark:text-gray-300 dark:bg-gray-700">
                <span className="block truncate">
                  {tournamentsStore ? tournamentsStore.title : "Выбери турнир"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  {open ? (
                    <HiChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <HiChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-700">
                  {tournaments.map((tour, tourIdx) => (
                    <Listbox.Option
                      key={tourIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-sky-900 dark:text-white"
                            : "text-gray-900 dark:text-gray-300"
                        }`
                      }
                      value={tour}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {tour.title}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
      <main className="flex flex-col min-w-0 pt-5">
        <div className="mx-auto min-w-0 max-w-[800px] flex-1">
          <ReportTextarea
            reportText={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
        </div>
      </main>
      {results && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle="Почти готово!"
          buttonTitle="Подтвердить"
          isButtonDisabled={
            (!thirdPlace && !thirdPlaceEnabled) || !isValidTlInput
          }
        >
          <Input
            value={tlValue}
            onChange={(e) => setTlValue(e.target.value)}
            label="Количество тех. лузов"
            error={!isValidTlInput}
            errorMessage="Неверный формат!"
          />
          <Switch
            label="Без 3-го место"
            checked={thirdPlaceEnabled}
            onChange={setThirdPlaceEnabled}
          />
          {!thirdPlaceEnabled && (
            <RadioGroup defaultValue={thirdPlace} onChange={setThirdPlace}>
              <RadioGroup.Label className="block text-sm mb-1 text-gray-700 dark:text-gray-400">
                {`Выбери ${
                  results.tourType !== "1x1" ? "команду" : "игрока"
                }, занявш${results.tourType !== "1x1" ? "ую" : "его"} 3 место`}
              </RadioGroup.Label>
              <div className="space-y-2">
                {[results?.firstChoice, results?.secondChoice].map((choice) => (
                  <RadioGroup.Option
                    key={choice[0]}
                    value={choice}
                    className={({ checked }) =>
                      `
                    ${
                      checked
                        ? "bg-sky-900 bg-opacity-75 text-white"
                        : "bg-white dark:bg-gray-700"
                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-semibold  ${
                                  checked
                                    ? "text-white"
                                    : "text-gray-900 dark:text-gray-300"
                                }`}
                              >
                                {choice[0]}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked
                                    ? "text-sky-100"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {choice.join(" & ")}
                              </RadioGroup.Description>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          )}
        </Modal>
      )}
      <Modal
        isOpen={isTourInProcessModalOpen}
        onClose={() => setIsTourInProcessModalOpen(false)}
        modalTitle="Ошибка!"
        buttonTitle="Понятно"
      >
        <span>Турнир в процессе</span>
      </Modal>
    </>
  );
};

export default Home;
