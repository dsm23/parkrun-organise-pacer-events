import type { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon, ChevronUp, User2 } from "lucide-react";
import Footer from "~/components/footer";
import Header from "~/components/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { createClient } from "~/utils/supabase/server";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = async ({ children }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Parkruns</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  {
                    name: "Chalkwell Beach",
                    searchParams: new URLSearchParams([
                      ["parkrun", "Chalkwell Beach"],
                    ]),
                  },
                  {
                    name: "Southend",
                    searchParams: new URLSearchParams([
                      ["parkrun", "Southend"],
                    ]),
                  },
                ].map((parkrun) => (
                  <SidebarMenuItem key={parkrun.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/protected?${parkrun.searchParams.toString()}`}
                        replace
                      >
                        <ChevronRightIcon />
                        <span>{parkrun.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user?.email}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
        <Header />
        <div className="grid grid-rows-[auto_1fr]">
          <SidebarTrigger />
          <main className="grid p-5">{children}</main>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
