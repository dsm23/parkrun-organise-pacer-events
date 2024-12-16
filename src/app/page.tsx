import Link from "next/link";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <Header />
        <main className="flex max-w-5xl flex-col gap-20 p-5">
          <div className="flex flex-1 flex-col gap-6 px-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Parkrun pacer event organiser
            </h1>
            <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              The Problem
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parkrun is an event where people get somewhat obsessed with their
              own personal best (PB), myself included. Many of us have a target
              time and though we could pursuit a data-driven approach to
              lowering our times I doubt there is greater motivation than an
              individual with a high-vis bip representing own target times
              running directly in front of us. To that end parkrun will hold
              pacer events once in a blue moon or rarer. The problem with the
              pacer events is organising for 20 individuals to be at one event
              on a certain day.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              This is such a daunting task that I am informed, in
              Southend-on-Sea, the Shoebury event owns the bips. They lent them
              to the Chalkwell event a couple of years ago and have since never
              even asked for them back.
            </p>

            <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              The Solution
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The digital solution: an interactive table where individual
              runners can leave a placeholder declaring their interest to run in
              a pacer bip. When we can get 20 individuals on any one Saturday
              then we trigger a pacer event.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Also, pacers receive volunteer credits.
            </p>
            <div className="mx-auto flex gap-2">
              <Button asChild variant="outline">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
