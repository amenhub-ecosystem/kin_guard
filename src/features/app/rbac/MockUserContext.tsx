import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getSession,
  logout as logoutUser,
} from "@/features/authentication/api/mockAuthApi";
import { setOnUnauthorized } from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';
import { ROLES, type Role } from "./roles";

export interface MockUser {
  id: string | null;
  role: Role;
  name: string;
  email: string;
  avatarUrl: string;
}

interface SessionUserShape {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

interface MockUserContextValue {
  user: MockUser;
  currentUser: SessionUserShape | null;
  authJourneyActive: boolean;
  isLoading: boolean;
  setRole: (role: Role) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAvatarUrl =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100";

const defaultUser: MockUser = {
  id: null,
  role: ROLES.FAMILY_ADMIN,
  name: "Loading user...",
  email: "",
  avatarUrl: defaultAvatarUrl,
};

function mapSessionUser(sessionUser: SessionUserShape | null | undefined): MockUser {
  if (!sessionUser) {
    return defaultUser;
  }

  return {
    id: sessionUser.id,
    role: sessionUser.role as Role,
    name: sessionUser.fullName,
    email: sessionUser.email,
    avatarUrl: defaultAvatarUrl,
  };
}

const MockUserContext = createContext<MockUserContextValue | undefined>(undefined);

export const MockUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<SessionUserShape | null>(null);
  const [authJourneyActive, setAuthJourneyActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [overrideRole, setOverrideRole] = useState<Role | null>(null);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const session = await getSession();
      setCurrentUser(session.currentUser ?? null);
      setAuthJourneyActive(Boolean(session.authJourneyActive));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const user = useMemo(() => {
    const effectiveRole = currentUser?.role ?? overrideRole ?? defaultUser.role;
    return {
      ...(currentUser ? mapSessionUser(currentUser) : defaultUser),
      id: currentUser?.id ?? null,
      role: effectiveRole,
      name: currentUser?.fullName ?? defaultUser.name,
      email: currentUser?.email ?? defaultUser.email,
      avatarUrl: defaultAvatarUrl,
    } satisfies MockUser;
  }, [currentUser, overrideRole]);

  const logout = useCallback(async () => {
    await logoutUser();
    setCurrentUser(null);
    setAuthJourneyActive(false);
    setOverrideRole(null);
    setIsLoading(false);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    // register global 401 handler
    setOnUnauthorized(() => {
      void logout();
      navigate('/auth');
    });
    return () => setOnUnauthorized(null);
  }, [logout, navigate]);

  const value = useMemo<MockUserContextValue>(
    () => ({
      user,
      currentUser,
      authJourneyActive,
      isLoading,
      setRole: (role: Role) => {
        if (!currentUser) {
          setOverrideRole(role);
        }
      },
      refreshUser,
      logout,
    }),
    [authJourneyActive, currentUser, isLoading, logout, refreshUser, user]
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
