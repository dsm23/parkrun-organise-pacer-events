import type { FunctionComponent, HTMLAttributes } from "react";
import Link from "next/link";
import { EnvVarWarning } from "~/components/env-var-warning";
import HeaderAuth from "~/components/header-auth";
import { cn } from "~/utils/cn";
import { hasEnvVars } from "~/utils/supabase/check-env-vars";

type Props = HTMLAttributes<HTMLElement>;

const Header: FunctionComponent<Props> = ({ className, ...props }) => (
  <nav
    {...props}
    className={cn(
      "flex h-16 w-full justify-center border-b border-b-foreground/10",
      className,
    )}
  >
    <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
      <div className="flex items-center gap-5 font-semibold">
        <Link href={"/"}>Home</Link>
      </div>
      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    </div>
  </nav>
);

export default Header;
