"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const addVolunteerAction = async (formData: FormData) => {
  const supabase = await createClient();

  const date = formData.get("date") as string;
  const finishTime = formData.get("finishTime") as string;
  const location = formData.get("location") as string;

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const { error } = await supabase.from("volunteer_nodes").insert({
      date,
      finish_time: Number(finishTime),
      user_id: data.user.id,
      location_id: Number(location),
    });

    if (error) {
      encodedRedirect(
        "error",
        "/protected/volunteer",
        "Failed to update list of volunteer declarations",
      );
    }
  }

  return redirect("/protected");
};

export const onboardingAction = async (formData: FormData) => {
  const supabase = await createClient();

  const defaultLocation = formData.get("defaultLocation") as string;
  const personalBest = formData.get("personalBest") as string;
  const username = formData.get("username") as string;

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const { error } = await supabase
      .from("profiles")
      .update({
        default_location_id: Number(defaultLocation),
        personal_best: `00:${personalBest}`,
        username,
      })
      .eq("id", data.user.id);

    if (error) {
      encodedRedirect(
        "error",
        "/protected/onboarding",
        "Failed to complete onboarding process",
      );
    }
  }

  return redirect("/protected");
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect("/protected");
};

export const signInWithGithubAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect("/protected");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
