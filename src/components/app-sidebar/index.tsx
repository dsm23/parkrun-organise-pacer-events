"use client";

import type { FunctionComponent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRightIcon, ChevronUp, User2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";
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
  SidebarSeparator,
} from "~/components/ui/sidebar";

type Props = {
  user: User | null;
};

const AppSidebar: FunctionComponent<Props> = ({ user }) => {
  const searchParams = useSearchParams();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Parkruns</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {["Chalkwell Beach", "Southend"].map((parkrun) => (
                <SidebarMenuItem key={parkrun}>
                  <SidebarMenuButton
                    asChild
                    isActive={parkrun === searchParams.get("parkrun")}
                  >
                    <Link
                      href={{
                        pathname: "/protected",
                        query: {
                          parkrun,
                        },
                      }}
                      replace
                    >
                      <ChevronRightIcon />
                      <span>{parkrun}</span>
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
  );
};

export default AppSidebar;
