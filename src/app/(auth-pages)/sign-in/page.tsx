import Link from "next/link";
import {
  signInAction,
  signInWithGithubAction,
  signInWithGoogleAction,
} from "~/app/actions";
import { FormMessage } from "~/components/form-message";
import OrContinueWith from "~/components/or-continue-with";
import { SubmitButton } from "~/components/submit-button";
import GitHub from "~/components/svgs/github";
import Google from "~/components/svgs/google";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Message } from "~/components/form-message";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="min-w-64 flex-1" action={signInAction}>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="font-medium text-foreground underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In...">Sign in</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

      <OrContinueWith />

      <form
        className="flex min-w-64 flex-1 flex-col"
        action={signInWithGoogleAction}
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
        action={signInWithGithubAction}
      >
        <SubmitButton
          className="flex items-center gap-x-2"
          pendingText="Signing In..."
        >
          <GitHub /> Sign in with GitHub
        </SubmitButton>
      </form>
    </>
  );
}
