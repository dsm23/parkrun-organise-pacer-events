import type { FunctionComponent } from "react";
import { format, formatISO } from "date-fns";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

type Props = {
  data: NonNullable<
    PostgrestSingleResponse<
      {
        date: string | null;
        finishTime: number | null;
        location: {
          name: string | null;
        } | null;
        user: {
          email: string | null;
        } | null;
      }[]
    >["data"]
  >;
  date: Date;
};

const AccordionSection: FunctionComponent<Props> = ({ data, date }) => {
  const strDate = format(date, "PPP");

  const arrEvents = data.filter(
    (event) => formatISO(date, { representation: "date" }) === event.date,
  );

  return (
    <AccordionItem key={`accordion-item-${strDate}`} value={strDate}>
      <AccordionTrigger>
        {strDate} ({arrEvents.length})
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-10">
          {arrEvents.map((event) => (
            <li key={`${strDate}-${event.user?.email}-${event.finishTime}`}>
              <dl className="grid grid-cols-[100px_1fr] items-center">
                <dt>Finish time:</dt>
                <dd className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {event.finishTime} mins
                </dd>
                <dt>User:</dt>
                <dd className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {event.user?.email}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionSection;
