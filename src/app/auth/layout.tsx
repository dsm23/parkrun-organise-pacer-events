import type { FunctionComponent, ReactNode } from "react";
import Footer from "~/components/footer";
import Header from "~/components/header";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => (
  <div className="flex min-h-screen flex-col items-center">
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Header />
      <main className="flex max-w-5xl flex-col gap-20 p-5">
        <div className="flex max-w-7xl flex-col items-start gap-12">
          {children}
        </div>
      </main>
    </div>
    <Footer />
  </div>
);

export default Layout;
