"use client";

import Link from "next/link";
import { signOutAction } from "~/app/actions";
import { hasEnvVars } from "~/utils/supabase/check-env-vars";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useUser } from "./user";

export default function AuthButton() {
  const user = useUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex items-center gap-4">
          <div>
            <Badge
              variant={"default"}
              className="pointer-events-none font-normal"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="pointer-events-none cursor-none opacity-75"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="pointer-events-none cursor-none opacity-75"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.full_name ?? user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
