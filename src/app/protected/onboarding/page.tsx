import { permanentRedirect } from "next/navigation";
import { onboardingAction } from "~/app/actions";
import { FormMessage } from "~/components/form-message";
import { SubmitButton } from "~/components/submit-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { createClient } from "~/utils/supabase/server";
import type { Message } from "~/components/form-message";

export default async function Onboarding(props: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const res = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (res.data?.username) {
      permanentRedirect("/");
    }
  }

  const searchParams = await props.searchParams;

  return (
    <div className="grid place-items-center">
      <div className="mx-auto space-y-8">
        <h1 className="text-2xl font-medium">Volunteer Form</h1>
        <form className="grid space-y-6" action={onboardingAction}>
          <fieldset className="space-y-1">
            <Label htmlFor="username">
              What username would you like to appear as in the public calendar
            </Label>
            <Input id="username" name="username" />
          </fieldset>

          <fieldset className="space-y-1">
            <Label htmlFor="defaultLocation">
              Which location would you like to be your default parkrun?
            </Label>
            <Select name="defaultLocation" defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>

                  <SelectItem value="1">Chalkwell Beach</SelectItem>
                  <SelectItem value="2">Southend</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="personalBest">
              What is your current PB? (this would have to be updated manually)
            </Label>
            <Input id="personalBest" name="personalBest" type="time" />
          </fieldset>
          <SubmitButton>Submit</SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
