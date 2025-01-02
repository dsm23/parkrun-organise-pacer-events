import type { User } from "@supabase/supabase-js";
import type { createClient } from "~/utils/supabase/server";

const getUsername = (
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: User["id"],
) => {
  return supabase
    .from("profiles")
    .select("id, username")
    .eq("id", userId)
    .single();
};

export default getUsername;
