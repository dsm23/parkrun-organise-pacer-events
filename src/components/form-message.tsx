import type { FunctionComponent, HTMLAttributes } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";

export type Message =
  | ReadonlyURLSearchParams
  | { success: string }
  | { error: string }
  | { message: string };

type StyledComponent = FunctionComponent<HTMLAttributes<HTMLDivElement>>;

const ErrorComponent: StyledComponent = (props) => (
  <div
    {...props}
    className="border-l-2 border-destructive-foreground px-4 text-destructive-foreground"
  />
);
const SuccessComponent: StyledComponent = (props) => (
  <div
    {...props}
    className="border-l-2 border-foreground px-4 text-foreground"
  />
);
const MessageComponent: StyledComponent = (props) => (
  <div {...props} className="border-l-2 px-4 text-foreground" />
);

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-2 text-sm">
      {"success" in message && (
        <SuccessComponent>{message.success}</SuccessComponent>
      )}
      {message instanceof ReadonlyURLSearchParams && message.get("success") && (
        <SuccessComponent>{message.get("success")}</SuccessComponent>
      )}
      {"error" in message && <ErrorComponent>{message.error}</ErrorComponent>}
      {message instanceof ReadonlyURLSearchParams && message.get("error") && (
        <ErrorComponent>{message.get("error")}</ErrorComponent>
      )}
      {"message" in message && (
        <MessageComponent>{message.message}</MessageComponent>
      )}
      {message instanceof ReadonlyURLSearchParams && message.get("message") && (
        <MessageComponent>{message.get("message")}</MessageComponent>
      )}
    </div>
  );
}
