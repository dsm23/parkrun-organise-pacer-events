import type { User } from "@supabase/supabase-js";
import type { createClient } from "~/utils/supabase/server";

const getDefaultParkrun = (
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: User["id"],
) => {
  return supabase
    .from("profiles")
    .select("defaultParkrun:locations(id, name)")
    .eq("id", userId)
    .throwOnError()
    .single();
};

export default getDefaultParkrun;
