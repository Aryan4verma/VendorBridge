"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/services/supabase/client";
import type { User } from "@/types/auth";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
});

function mapUser(session: Session | null): User | null {
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email ?? "",
    role: (session.user.user_metadata?.role as User["role"]) ?? "vendor",
    fullName: session.user.user_metadata?.full_name ?? "",
    avatarUrl: session.user.user_metadata?.avatar_url ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  const handleSession = useCallback((newSession: Session | null) => {
    setSession(newSession);
    setUser(mapUser(newSession));
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      handleSession(currentSession);
      setIsLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      handleSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, [supabase, handleSession]);

  return (
    <AuthContext.Provider value={{ user, session, isLoading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
