import type { User } from "@supabase/supabase-js";
import type { createClient } from "~/utils/supabase/server";

const getPersonalBest = (
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: User["id"],
) => {
  return supabase
    .from("profiles")
    .select("id, personalBest:personal_best")
    .eq("id", userId)
    .single();
};

export default getPersonalBest;
