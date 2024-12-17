import type { FunctionComponent, HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

type Props = HTMLAttributes<HTMLDivElement>;

const OrContinueWith: FunctionComponent<Props> = ({ className }) => (
  <div className={cn("relative mx-auto w-full", className)}>
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-muted-foreground" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div>
);

export default OrContinueWith;
