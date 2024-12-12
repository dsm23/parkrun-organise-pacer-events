import type { FunctionComponent } from "react";
import Link from "next/link";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { addDays, nextSunday, subDays } from "date-fns";
import { PlusIcon } from "lucide-react";
import AccordionSection from "~/components/accordion-section";
import Calendar from "~/components/calendar";
import { Accordion } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { createClient } from "~/utils/supabase/server";

type Props = {
  searchParams: Promise<{ parkrun: string | string[] | undefined }>;
};

const ProtectedPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const supabase = await createClient();

  const { parkrun } = await searchParams;

  if (!parkrun) {
    const urlSearchParams = new URLSearchParams({ parkrun: "Southend" });

    permanentRedirect(
      `/protected?${urlSearchParams.toString()}`,
      RedirectType.replace,
    );
  }

  const today = new Date();
  const dates = Array.from({ length: 50 }, (_, i) =>
    subDays(nextSunday(addDays(today, i * 7)), 1),
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const res = await supabase
    .from("volunteer_nodes")
    .select(
      "date, finishTime:finish_time, location:locations(name), user:users(email)",
    )
    .eq("locations.name", parkrun)
    .not("location", "is", null)
    .order("finish_time", { ascending: true });

  const data = res.data ?? [];

  return (
    <div className="grid justify-stretch">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pacer event organiser
      </h1>

      <Button variant="link" asChild className="w-fit">
        <Link href="/protected/roadmap">Click here to see the Roadmap</Link>
      </Button>

      <Button className="mt-10 w-fit" asChild>
        <Link href="/protected/volunteer">
          Volunteer <PlusIcon className="size-6" />
        </Link>
      </Button>

      <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Saturdays
      </h2>

      <Accordion type="multiple">
        {dates.map((date) => (
          <AccordionSection
            key={`accordion-item-${date.toString()}`}
            data={data}
            date={date}
          />
        ))}
      </Accordion>

      <div className="max-w-7xl">
        <Calendar />
      </div>
    </div>
  );
};

export default ProtectedPage;
