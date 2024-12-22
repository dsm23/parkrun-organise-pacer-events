import type { FunctionComponent } from "react";
import Link from "next/link";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { PlusIcon } from "lucide-react";
import Calendar from "~/components/calendar";
import { Button } from "~/components/ui/button";
import { createClient } from "~/utils/supabase/server";

type Props = {
  searchParams: Promise<{ parkrun: string | string[] | undefined }>;
};

const ProtectedPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const supabase = await createClient();

  const { parkrun } = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profilesResponse = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!profilesResponse.data?.username) {
    redirect("/protected/onboarding");
  }

  if (!parkrun) {
    const res = await supabase
      .from("profiles")
      .select("defaultParkrun:locations(name)")
      .eq("id", user.id)
      .single();

    const urlSearchParams = new URLSearchParams({
      parkrun: res.data?.defaultParkrun?.name ?? "Southend",
    });

    permanentRedirect(
      `/protected?${urlSearchParams.toString()}`,
      RedirectType.replace,
    );
  }

  const res = await supabase
    .from("volunteer_nodes")
    .select(
      "date, finishTime:finish_time, location:locations(name), user:profiles(personalBest:personal_best, username)",
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

      <Calendar data={data} />
    </div>
  );
};

export default ProtectedPage;
