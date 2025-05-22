"use client";

import { getProfile } from "@/actions/login";
import { IAuth } from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: IAuth | null;
  setUser: (user: IAuth | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const preload = async () => {
    const user = await getProfile();
    if (user) setUser(user);
    else push("/login");
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
