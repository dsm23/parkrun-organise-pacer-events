import type { FunctionComponent, HTMLAttributes } from "react";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { cn } from "~/utils/cn";

type Props = HTMLAttributes<HTMLElement>;

const Footer: FunctionComponent<Props> = ({ className, ...props }) => (
  <footer
    {...props}
    className={cn(
      "mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-xs",
      className,
    )}
  >
    <div>
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </p>
      <p className="mt-2">
        Developed by <span className="font-bold">David Murdoch</span>
      </p>
    </div>
    <ThemeSwitcher />
  </footer>
);

export default Footer;
