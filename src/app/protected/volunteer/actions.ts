"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { encodedRedirect } from "~/utils/utils";

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
