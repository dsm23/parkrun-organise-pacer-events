"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Provider } from "@supabase/supabase-js";
import { createClient } from "~/utils/supabase/server";
import { encodedRedirect } from "~/utils/utils";

export const signUpAction = async (formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const email = formData.get("email")?.toString();

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(`${error.code ?? ""} ${error.message}`);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signUpWithOAuthAction = async (provider: Provider) => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect("/protected");
};
