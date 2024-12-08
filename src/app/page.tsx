import Hero from "~/components/hero";
import ConnectSupabaseSteps from "~/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "~/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "~/utils/supabase/check-env-vars";

export default function Index() {
  return (
    <>
      <Hero />
      <div className="flex flex-1 flex-col gap-6 px-4">
        <h1 className="sr-only">Delete this</h1>
        <h2 className="mb-4 text-xl font-medium">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </div>
    </>
  );
}
