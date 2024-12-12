import type { FunctionComponent, ReactNode } from "react";
import AppSidebar from "~/components/app-sidebar";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
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
      <AppSidebar user={user} />

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
