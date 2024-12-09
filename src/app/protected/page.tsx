import { redirect } from "next/navigation";
import Calendar from "~/components/calendar";
import { createClient } from "~/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dataSelect } = await supabase
    .from("volunteer_nodes")
    .select(
      "date, finishTime:finish_time, location:locations(name), user:users(email)",
    );

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
        {JSON.stringify(dataSelect, null, 2)}
      </pre>

      <Calendar />
    </>
  );
}
