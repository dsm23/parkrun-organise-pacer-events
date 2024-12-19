"use client";

import { useState } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import { addDays, format, formatISO, nextSunday, subDays } from "date-fns";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/carousel";
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
    date: string | null;
    finishTime: number | null;
    location: {
      name: string | null;
    };
    user: {
      email: string | null;
    };
  }[];
};

const Calendar: FunctionComponent<Props> = ({ data }) => {
  const [isMonthView, setMonthView] = useState(true);
  const today = new Date();
  const multiplesOfSeven = Array.from({ length: 50 }, (_, i) => (i + 0) * 7);

  const volunteerTimes = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 38,
    40,
  ];

  // const foo = data
  // .filter(
  //   ({ finishTime, date }) =>
  //     finishTime === xAxisTime &&
  //     date ===
  //       formatISO(
  //         subDays(
  //           nextSunday(addDays(today, multipleOfSeven)),
  //           1,
  //         ),
  //         { representation: "date" },
  //       ),
  // )

  // if (data.length > 0) {
  //   const foo = data.reduce(
  //     (acc, cur) => ({
  //       ...acc,
  //       [cur.finishTime]: {
  //         ...acc[cur.finishTime],
  //         [cur.date]: [...(acc[cur.finishTime]?.[cur.date] ?? []), cur],
  //       },
  //     }),
  //     {},
  //   );

  //   console.log(foo, "foo");
  // }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-end px-6 py-4">
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-x-2"
                >
                  Month view <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
      </header>

      {/* <Carousel>
        <CarouselContent>
          <CarouselItem>This week</CarouselItem>
          <CarouselItem>Next week</CarouselItem>
          {Array.from({ length: 50 }, (_, i) => (
            <CarouselItem key={`in-english-${i}`}>{i + 2} weeks</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </Carousel> */}

      <Carousel
        opts={{
          dragFree: true,
        }}
      >
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
        <div className="grid grid-cols-[4.5rem_minmax(0,_1fr)] grid-rows-[2rem_1fr]">
          <div className="border-b border-r border-foreground" />

          <div className="row-start-2 flex flex-col text-right">
            {volunteerTimes.map((xAxisTimes) => (
              <div
                className="min-h-16 border-b border-r border-foreground pr-1"
                key={`${xAxisTimes}-left-column`}
              >
                {xAxisTimes}mins
              </div>
            ))}
          </div>

          <div className="col-start-2 row-span-2 row-start-1">
            <CarouselContent>
              {multiplesOfSeven.map((multipleOfSeven) => (
                <CarouselItem
                  key={`saturdays-${multipleOfSeven}`}
                  className={cn("basis-full pl-0", {
                    "md:basis-1/4": isMonthView,
                  })}
                >
                  <div className="flex h-8 items-center justify-center border-b border-r border-foreground font-semibold">
                    {format(
                      subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                      "PP",
                    )}
                  </div>

                  {volunteerTimes.map((xAxisTime) => (
                    <div
                      className="min-h-16 border-b border-r border-muted-foreground p-2"
                      key={`${xAxisTime}-item-${multipleOfSeven}`}
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
                            key={`${volunteer.user.email}-${index}`}
                            className="grid h-fit rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                          >
                            <dl>
                              <dt className="sr-only">Personal best</dt>
                              <dd className="order-1 font-semibold text-blue-700">
                                PB = placholder
                              </dd>
                              <dt className="sr-only">Volunteer name</dt>
                              <dd className="text-blue-500 group-hover:text-blue-700">
                                <span>
                                  John Doe placeholder {volunteer.user.email}
                                </span>
                              </dd>
                            </dl>
                          </Link>
                        ))}
                    </div>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Calendar;
