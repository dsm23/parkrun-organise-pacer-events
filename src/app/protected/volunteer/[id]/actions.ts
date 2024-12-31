"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { encodedRedirect } from "~/utils/utils";

export const deleteVolunteerAction = async (id: number) => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const { error } = await supabase
      .from("volunteer_nodes")
      .delete()
      .eq("id", id);

    if (error) {
      encodedRedirect(
        "error",
        `/protected/volunteer/${id}`,
        "Failed to update list of volunteer declarations",
      );
    }
  }

  return redirect("/protected");
};
