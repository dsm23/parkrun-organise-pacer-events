"use client";

import type { FunctionComponent } from "react";
import Link from "next/link";
import {
  permanentRedirect,
  redirect,
  RedirectType,
  useSearchParams,
} from "next/navigation";
import {
  useQuery,
  useSubscription,
} from "@supabase-cache-helpers/postgrest-react-query";
import { PlusIcon } from "lucide-react";
import Calendar from "~/components/calendar";
import Spinner from "~/components/svgs/spinner";
import { Button } from "~/components/ui/button";
import { useAuthenticatedUser } from "~/components/user";
import useSupabaseBrowser from "~/hooks/use-supabase-browser";
import getDefaultParkrun from "~/queries/default-parkrun";
import getPersonalBest from "~/queries/personal-best";
import getVolunteerNodes from "~/queries/volunteer-nodes";

type Props = {
  searchParams: Promise<{ parkrun: string | string[] | undefined }>;
};

const ProtectedPage: FunctionComponent<Props> = () => {
  const searchParams = useSearchParams();
  const supabase = useSupabaseBrowser();
  const user = useAuthenticatedUser();

  const resPersonalData = useQuery(getPersonalBest(supabase, user.id));

  if (!resPersonalData.data?.personalBest) {
    redirect("/protected/onboarding");
  }

  const parkrun = searchParams.get("parkrun");

  const resDefaultParkrun = useQuery(getDefaultParkrun(supabase, user.id));

  if (!parkrun) {
    const urlSearchParams = new URLSearchParams({
      parkrun: resDefaultParkrun.data?.defaultParkrun?.name ?? "Southend",
    });

    permanentRedirect(
      `/protected?${urlSearchParams.toString()}`,
      RedirectType.replace,
    );
  }

  const res = useQuery(getVolunteerNodes(supabase, parkrun), {
    // networkMode: "offlineFirst",
  });

  const data = res.data ?? [];

  useSubscription(
    supabase,
    "calendar",
    {
      event: "*",
      table: "volunteer_nodes",
      schema: "public",
    },
    ["id"],
    {
      callback: async () => {
        await res.refetch();
      },
    },
  );

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

      {res.isPending && (
        <div>
          loading calendar data <Spinner className="text-foreground" />
        </div>
      )}

      <Calendar data={data} />
    </div>
  );
};

export default ProtectedPage;
