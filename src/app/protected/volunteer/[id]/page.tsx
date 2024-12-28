"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { format } from "date-fns";
import { deleteVolunteerAction } from "~/app/actions";
import { FormMessage } from "~/components/form-message";
import { SubmitButton } from "~/components/submit-button";
import Spinner from "~/components/svgs/spinner";
import { useAuthenticatedUser } from "~/components/user";
import useSupabaseBrowser from "~/hooks/use-supabase-browser";
import getVolunteerNode from "~/queries/volunteer-individual";

const IndividualVolunteerNodePage = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const supabase = useSupabaseBrowser();
  const user = useAuthenticatedUser();

  const { data, error, isError, isPending } = useQuery(
    getVolunteerNode(supabase, Number(params.id)),
  );

  const deleteVolunteerActionWithId = deleteVolunteerAction.bind(
    null,
    Number(params.id),
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Individual Volunteer declaration</h1>
      {isPending ? (
        <Spinner />
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4">
            <dt>Finish time: </dt>
            <dd>{data?.finishTime}mins</dd>

            <dt>Date: </dt>
            {data?.date && <dd>{format(data.date, "PPP")}</dd>}

            <dt>Parkrun location: </dt>
            <dd>{data?.location.name}</dd>

            <dt>User: </dt>
            <dd>{data?.user.username}</dd>

            <dt>Personal best:</dt>
            <dd>{data?.user.personalBest}</dd>
          </dl>

          {data?.user.id === user.id && (
            <form action={deleteVolunteerActionWithId}>
              <SubmitButton variant="destructive">
                Delete this volunteer declaration
              </SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default IndividualVolunteerNodePage;
