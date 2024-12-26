"use client";

import { Fragment, useState } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import { addDays, format, formatISO, nextSunday, subDays } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/utils/cn";

type Props = {
  data: {
    id: number | null;
    date: string | null;
    finishTime: number | null;
    location: {
      name: string | null;
    };
    user: {
      personalBest: string | null;
      username: string | null;
    };
  }[];
};

const Calendar: FunctionComponent<Props> = ({ data }) => {
  const [weekView, setWeekView] = useState(0);
  const [isMonthView, setMonthView] = useState(true);
  const today = new Date();
  const multiplesOfSeven = Array.from(
    { length: isMonthView ? 4 : 1 },
    (_, i) => (i + weekView) * 7,
  );

  const volunteerTimes = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 38,
    40,
  ];

  const handleNextClick = () => {
    setWeekView((prevWeekView) => Math.min(51, prevWeekView + 1));
  };

  const handlePrevClick = () => {
    setWeekView((prevWeekView) => Math.max(0, prevWeekView - 1));
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-end px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center gap-x-3">
            <Button variant="outline" size="icon" onClick={handlePrevClick}>
              <ChevronLeft className="size-4" />
            </Button>

            {weekView === 0 && <div>This week</div>}
            {weekView === 1 && <div>Next week</div>}

            {Array.from({ length: 50 }, (_, i) => (
              <Fragment key={`in-english-${i}`}>
                {weekView === i + 2 && <div>{i + 2} weeks</div>}
              </Fragment>
            ))}

            <Button variant="outline" size="icon" onClick={handleNextClick}>
              <ChevronRight className="size-4" />
            </Button>
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-x-2"
                  >
                    {isMonthView ? "Month" : "Day"} view{" "}
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setMonthView(false);
                    }}
                  >
                    Day view
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setMonthView(true);
                    }}
                  >
                    Month view
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[4.5rem_minmax(0,_1fr)]">
        <div className="border-b border-r border-foreground" />
        <div
          className={cn("grid grid-cols-1", {
            "md:grid-cols-4": isMonthView,
          })}
        >
          {multiplesOfSeven.map((multipleOfSeven) => (
            <Fragment key={`${multipleOfSeven}-calendar-top`}>
              <div className="hidden items-center justify-center border-b border-r border-foreground font-semibold first:grid md:grid lg:hidden lg:first:hidden">
                {format(
                  subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                  "P",
                )}
              </div>

              <div className="hidden items-center justify-center border-b border-r border-foreground font-semibold lg:grid lg:first:grid">
                {format(
                  subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                  "PP",
                )}
              </div>
            </Fragment>
          ))}
        </div>

        {volunteerTimes.map((xAxisTime) => (
          <Fragment key={`${xAxisTime}-calendar-row`}>
            <div className="min-h-16 border-b border-r border-foreground pr-1">
              {xAxisTime}mins
            </div>
            <div
              className={cn("grid grid-cols-1", {
                "md:grid-cols-4": isMonthView,
              })}
            >
              {multiplesOfSeven.map((multipleOfSeven) => (
                <div
                  key={`${xAxisTime}-item-${multipleOfSeven}`}
                  className="hidden gap-2 border-b border-r border-muted-foreground p-2 first:grid md:grid"
                >
                  {data
                    .filter(
                      ({ finishTime, date }) =>
                        finishTime === xAxisTime &&
                        date ===
                          formatISO(
                            subDays(
                              nextSunday(addDays(today, multipleOfSeven)),
                              1,
                            ),
                            { representation: "date" },
                          ),
                    )
                    .map((volunteer, index) => (
                      <Link
                        href="#"
                        key={`${volunteer.user.username}-${index}`}
                        className="grid h-fit rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                      >
                        <dl>
                          <dt className="sr-only">Personal best</dt>
                          <dd className="order-1 font-semibold text-blue-700">
                            PB = {volunteer.user.personalBest?.substring(3)}
                          </dd>
                          <dt className="sr-only">Volunteer name</dt>
                          <dd className="text-blue-500 group-hover:text-blue-700">
                            <span>{volunteer.user.username}</span>
                          </dd>
                        </dl>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
