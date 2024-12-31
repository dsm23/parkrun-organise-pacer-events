"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { encodedRedirect } from "~/utils/utils";

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
