import Link from "next/link";
import { FormMessage } from "~/components/form-message";
import OrContinueWith from "~/components/or-continue-with";
import { SubmitButton } from "~/components/submit-button";
import Facebook from "~/components/svgs/facebook";
import GitHub from "~/components/svgs/github";
import Google from "~/components/svgs/google";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Message } from "~/components/form-message";
import { signUpAction, signUpWithOAuthAction } from "./actions";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const signUpWithFacebookAction = signUpWithOAuthAction.bind(null, "facebook");
  const signUpWithGithubAction = signUpWithOAuthAction.bind(null, "github");
  const signUpWithGoogleAction = signUpWithOAuthAction.bind(null, "google");

  return (
    <>
      <form
        className="mx-auto flex min-w-64 max-w-64 flex-col"
        action={signUpAction}
      >
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <fieldset className="space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              aria-describedby="full-name-description"
              required
            />
            <small
              id="full-name-description"
              className="text-[0.8rem] text-muted-foreground"
            >
              This value will display in the calendar
            </small>
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
          </fieldset>
          <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

      <OrContinueWith />

      <form
        className="flex min-w-64 flex-1 flex-col"
        action={signUpWithGoogleAction}
      >
        <SubmitButton
          className="flex items-center gap-x-2"
          pendingText="Signing In..."
        >
          <Google /> Sign in with Google
        </SubmitButton>
      </form>

      <form
        className="flex min-w-64 flex-1 flex-col"
        action={signUpWithGithubAction}
      >
        <SubmitButton
          className="flex items-center gap-x-2"
          pendingText="Signing In..."
        >
          <GitHub /> Sign in with GitHub
        </SubmitButton>
      </form>

      <form
        className="flex min-w-64 flex-1 flex-col"
        action={signUpWithFacebookAction}
      >
        <SubmitButton
          className="flex items-center gap-x-2"
          pendingText="Signing In..."
        >
          <Facebook /> Sign in with Facebook
        </SubmitButton>
      </form>
    </>
  );
}
