import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import { getProfile } from "../api/auth";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const data = await getProfile();
      setUser(data);
    } catch {
      setUser(null);
    }
  };
  fetchProfile();
}, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
