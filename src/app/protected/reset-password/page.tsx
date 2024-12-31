import { FormMessage } from "~/components/form-message";
import { SubmitButton } from "~/components/submit-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Message } from "~/components/form-message";
import { resetPasswordAction } from "./actions";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form
      className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4"
      action={resetPasswordAction}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton>Reset password</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
