import { useMemo } from "react";
import { env } from "next-runtime-env";
import { createBrowserClient } from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/database.types";

export type TypedSupabaseClient = SupabaseClient<Database>;

let client: TypedSupabaseClient | undefined;

function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  client = createBrowserClient<Database>(
    env("NEXT_PUBLIC_SUPABASE_URL") ?? "",
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "",
  );

  return client;
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabaseBrowser;
