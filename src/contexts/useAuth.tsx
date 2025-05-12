"use client";

import { getProfile } from "@/helpers/login";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
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
    throw new Error("useMyAppContext must be used within a MyAppProvider");
  }
  return context;
};
