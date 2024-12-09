import { addDays, format, nextSunday, subDays } from "date-fns";
import { addVolunteerAction } from "~/app/actions";
import { FormMessage } from "~/components/form-message";
import { SubmitButton } from "~/components/submit-button";
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
import type { Message } from "~/components/form-message";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const today = new Date();
  return (
    <>
      <h1 className="text-2xl font-medium">Volunteer Form</h1>
      <form className="grid w-full space-y-8 p-4" action={addVolunteerAction}>
        <fieldset className="space-y-1">
          <Label htmlFor="date">
            When would you like to volunteer to be a pacer?
          </Label>
          <Select name="date">
            <SelectTrigger>
              <SelectValue placeholder="Select a date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                {Array.from({ length: 50 }, (_, i) => i * 7).map(
                  (multipleOfSeven) => (
                    <SelectItem
                      key={`${multipleOfSeven}-mins`}
                      value={format(
                        subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                        "dd/MM/yyyy",
                      )}
                    >
                      {format(
                        subDays(nextSunday(addDays(today, multipleOfSeven)), 1),
                        "dd/MM/yyyy",
                      )}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset className="space-y-1">
          <Label htmlFor="finishTime">
            What finish time would you like to volunteer as?
          </Label>
          <Select name="finishTime">
            <SelectTrigger>
              <SelectValue placeholder="Select a finish time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Finish Time</SelectLabel>
                {[
                  ...Array.from({ length: 17 }, (_, i) => i + 18),
                  36,
                  38,
                  40,
                ].map((num) => (
                  <SelectItem key={`${num}-mins`} value={num.toString()}>
                    {num} mins
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </fieldset>
        <SubmitButton>Submit</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </>
  );
}
