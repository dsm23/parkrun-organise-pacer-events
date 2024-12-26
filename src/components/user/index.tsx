"use client";

import { createContext, useContext } from "react";
import type { FunctionComponent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { UserResponse } from "@supabase/supabase-js";

const UserContext = createContext<UserResponse | null>(null);

type Props = {
  children: ReactNode;
  response: UserResponse | null;
};

const UserProvider: FunctionComponent<Props> = ({ children, response }) => {
  return (
    <UserContext.Provider value={response}>{children}</UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);

  return context?.data.user;
}

function useAuthenticatedUser() {
  const context = useContext(UserContext);
  const pathname = usePathname();

  if (pathname.startsWith("/protected") && context?.error) {
    throw new Error(
      "useAuthenticatedUser should be used within a UserProvider for loggedIn flow",
    );
  }

  if (pathname === "/" && !context?.error) {
    throw new Error(
      "useAuthenticatedUser should be used within a UserProvider for loggedIn flow",
    );
  }

  if (!context?.data.user) {
    throw new Error(
      "useAuthenticatedUser should be used within a UserProvider for loggedIn flow",
    );
  }

  return context.data.user;
}

export { UserProvider, useAuthenticatedUser, useUser };
