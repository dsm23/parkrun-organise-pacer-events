import type { FunctionComponent, ReactNode } from "react";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppSidebar from "~/components/app-sidebar";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { UserProvider } from "~/components/user";
import getDefaultParkrun from "~/queries/default-parkrun";
import getUsername from "~/queries/username";
import { createClient } from "~/utils/supabase/server";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = async ({ children }) => {
  const supabase = await createClient();
  const queryClient = new QueryClient();

  const response = await supabase.auth.getUser();

  const { user } = response.data;

  await Promise.all([
    prefetchQuery(
      queryClient,
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      getDefaultParkrun(supabase, user?.id as string),
    ),
    prefetchQuery(
      queryClient,
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      getUsername(supabase, user?.id as string),
    ),
  ]);

  return (
    <UserProvider response={response}>
      <SidebarProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AppSidebar user={user} />

          <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="grid grid-rows-[auto_1fr]">
              <SidebarTrigger />
              <main className="grid p-5">{children}</main>
            </div>

            <Footer />
          </div>
        </HydrationBoundary>
      </SidebarProvider>
    </UserProvider>
  );
};

export default Layout;
