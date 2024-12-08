import Link from "next/link";
import { Button } from "./ui/button";

export default function DeployButton() {
  return (
    <>
      <Link
        href="https://vercel.com/new/git/external?repository-url=https://github.com/dsm23/dsm23-next-supabase-template"
        target="_blank"
      >
        <Button className="flex items-center gap-2" size={"sm"}>
          <svg
            className="size-3"
            viewBox="0 0 76 65"
            fill="hsl(var(--background)/1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
          </svg>
          <span>Deploy to Vercel</span>
        </Button>
      </Link>
    </>
  );
}
