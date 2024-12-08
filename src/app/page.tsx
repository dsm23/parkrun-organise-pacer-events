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
        <h2 className="mb-2 mt-4 text-xl font-medium">The Problem</h2>
        <p>
          Parkrun is an event where people get somewhat obsessed with their own
          personal best (PB), myself included. Many of us have a target time and
          though we could pursuit a data-driven approach to lowering our times I
          doubt there is greater motivation than an individual with a high-vis
          bip representing own target times running directly in front of us. To
          that end parkrun will hold pacer events once in a blue moon or event
          rarer. The problem with the pacer events is organising for 20
          individuals to be at one event on a certain day.
        </p>
        <p>
          This is such a daunting tasks that I am informed that in
          Southend-on-Sea, the Shoebury event owns the bips. They lent them to
          the Chalkwell event a couple of years ago and have since never even
          asked for them back.
        </p>

        <h2 className="mb-2 mt-4 text-xl font-medium">The Solution</h2>
        <p>
          The digital solution: an interactive table where individual runners
          can leave a placeholder declaring their interest to run in a pacer
          bip. When we can get 20 individuals on any one Saturday then we
          trigger a pacer event.
        </p>
      </div>
    </>
  );
}
