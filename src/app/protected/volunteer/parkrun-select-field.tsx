"use client";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
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
import { useAuthenticatedUser } from "~/components/user";
import useSupabaseBrowser from "~/hooks/use-supabase-browser";
import getDefaultParkrun from "~/queries/default-parkrun";

const ParkrunSelectField = () => {
  const supabase = useSupabaseBrowser();

  const user = useAuthenticatedUser();

  const { data } = useQuery(getDefaultParkrun(supabase, user.id));
  return (
    <>
      <Label htmlFor="location">
        Which location would you like to volunteer as?
      </Label>
      <Select
        name="location"
        defaultValue={data?.defaultParkrun?.id.toString()}
      >
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
    </>
  );
};

export default ParkrunSelectField;
