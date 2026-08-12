import React, { createContext, useContext, useMemo, useState } from "react";
import { ROLES, type Role } from "./roles";

export interface MockUser {
  role: Role;
  name: string;
  email: string;
  avatarUrl: string;
}

interface MockUserContextValue {
  user: MockUser;
  setRole: (role: Role) => void;
}

const defaultUser: MockUser = {
  role: ROLES.CAREGIVER,
  name: "Israel Harrison",
  email: "israel@kinguard.com",
  avatarUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100",
};

const MockUserContext = createContext<MockUserContextValue | undefined>(undefined);

export const MockUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<MockUser>(defaultUser);

  const value = useMemo(
    () => ({
      user,
      setRole: (role: Role) => setUser((current) => ({ ...current, role })),
    }),
    [user]
  );

  return <MockUserContext.Provider value={value}>{children}</MockUserContext.Provider>;
};

export function useMockUser() {
  const context = useContext(MockUserContext);
  if (!context) {
    throw new Error("useMockUser must be used within a MockUserProvider");
  }
  return context;
}
