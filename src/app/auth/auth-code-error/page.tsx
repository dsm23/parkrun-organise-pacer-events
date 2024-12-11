import { FormMessage } from "~/components/form-message";
import type { Message } from "~/components/form-message";

export default async function AuthCodeError(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Something went wrong</h1>

      <FormMessage message={searchParams} />
    </div>
  );
}
