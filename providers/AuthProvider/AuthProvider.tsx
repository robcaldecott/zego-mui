import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AuthContextData {
  status: "loggedOut" | "loggedIn";
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = (props: { children: ReactNode }) => {
  // const [status, setStatus] = useState<AuthContextData["status"]>("loggedOut");
  const [status, setStatus] = useState<AuthContextData["status"]>("loggedIn");
  const value = useMemo(
    () => ({
      status,
      login: () => setStatus("loggedIn"),
      logout: () => setStatus("loggedOut"),
    }),
    [status]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
