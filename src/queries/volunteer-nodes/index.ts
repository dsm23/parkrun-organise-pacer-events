import type { createClient } from "~/utils/supabase/server";

const getVolunteerNodes = (
  supabase: Awaited<ReturnType<typeof createClient>>,
  parkrun: string,
) => {
  return supabase
    .from("volunteer_nodes")
    .select(
      "id, date, finishTime:finish_time, location:locations(name), user:profiles(personalBest:personal_best, username)",
    )
    .eq("locations.name", parkrun)
    .not("location", "is", null)
    .order("finish_time", { ascending: true });
};

export default getVolunteerNodes;
