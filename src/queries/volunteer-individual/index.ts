import type { createClient } from "~/utils/supabase/server";

const getVolunteerNode = (
  supabase: Awaited<ReturnType<typeof createClient>>,
  id: number,
) => {
  return supabase
    .from("volunteer_nodes")
    .select(
      "id, date, finishTime:finish_time, location:locations(name), user:profiles(id, personalBest:personal_best, username)",
    )
    .eq("id", id)
    .throwOnError()
    .single();
};

export default getVolunteerNode;
