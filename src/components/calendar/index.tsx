"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { addDays, format, nextSunday, subDays } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/carousel";

export default function Calendar() {
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);
  const [weekIndex, setWeekIndex] = useState(0);
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => (i + weekIndex) * 7);

  const handlePreviousClick = () => {
    setWeekIndex((prevWeekIndex) => Math.max(0, prevWeekIndex + 1));
  };

  const handleNextClick = () => {
    setWeekIndex((prevWeekIndex) => Math.min(52, prevWeekIndex + 1));
  };

  useEffect(() => {
    // Set the container scroll position based on the current time.
    if (container.current) {
      container.current.scrollTop =
        (container.current.scrollHeight -
          (containerNav.current?.offsetHeight ?? 0) -
          (containerOffset.current?.offsetHeight ?? 0)) /
        1440;
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Carousel>
        <CarouselContent>
          <CarouselItem>This week</CarouselItem>
          <CarouselItem>Next week</CarouselItem>
          {Array.from({ length: 50 }, (_, i) => (
            <CarouselItem key={`in-english-${i}`}>{i + 2} weeks</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <header className="flex flex-none items-center justify-end border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={handlePreviousClick}
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              This week
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={handleNextClick}
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Week view
                <ChevronDownIcon
                  className="-mr-1 size-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Day view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Week view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Month view
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Create event
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Go to this week
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Day view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Week view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Month view
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black/5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden">
              {dates.map((multipleOfSeven) => (
                <button
                  type="button"
                  key={`small-days-${multipleOfSeven}`}
                  className="flex flex-col items-center pb-3 pt-2"
                >
                  <span className="mt-1 flex items-center justify-center rounded-md bg-indigo-600 font-semibold text-white">
                    {format(
                      subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                      "dd/MM",
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />

              {dates.map((multipleOfSeven) => (
                <div
                  key={`medium-days-${multipleOfSeven}`}
                  className="flex items-center justify-center py-3"
                >
                  <span className="items-center justify-center font-semibold text-gray-900">
                    {format(
                      subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                      "dd/MM/yyyy",
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{
                  gridTemplateRows: "repeat(20, minmax(4.5rem, 1fr))",
                }}
              >
                <div ref={containerOffset} className="row-end-1 h-7" />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    18 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    19 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    20 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    21 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    22 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    23 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    24 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    25 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    26 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    27 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    28 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    29 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    30 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    31 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    32 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    33 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    34 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    36 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    38 mins
                  </div>
                </div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    40 mins
                  </div>
                </div>{" "}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(100, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "12 / span 5" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      PB = 19:10
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <div>David Murdoch</div>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "17 / span 5" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100"
                  >
                    <p className="order-1 font-semibold text-pink-700">
                      PB = 20:30
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <div>John Doe</div>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px hidden sm:col-start-6 sm:flex"
                  style={{ gridRow: "22 / span 5" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs/5 hover:bg-gray-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      PB = 21:19
                    </p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <div>Jane Doe</div>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
