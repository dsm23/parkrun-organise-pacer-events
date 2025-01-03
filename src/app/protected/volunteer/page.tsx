import { addDays, format, nextSunday, subDays } from "date-fns";
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
import { addVolunteerAction } from "./actions";
import ParkrunSelectField from "./parkrun-select-field";

export default async function AddVolunteer(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const today = new Date();
  return (
    <div className="grid place-items-center">
      <div className="mx-auto space-y-8">
        <h1 className="text-2xl font-medium">Volunteer Form</h1>
        <form className="grid space-y-6" action={addVolunteerAction}>
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
                          subDays(
                            nextSunday(addDays(today, multipleOfSeven)),
                            1,
                          ),
                          "yyyy/MM/dd",
                        )}
                      >
                        {format(
                          subDays(
                            nextSunday(addDays(today, multipleOfSeven)),
                            1,
                          ),
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
          <fieldset className="space-y-1">
            <ParkrunSelectField />
          </fieldset>
          <SubmitButton>Submit</SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
