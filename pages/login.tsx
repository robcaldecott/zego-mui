import { setCookies } from "cookies-next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Login } from "@/components";

const LoginPage: NextPage & { useLayout: boolean } = () => {
  const router = useRouter();

  return (
    <Login
      onLogin={() => {
        setCookies("token", "LOGGEDIN");
        router.replace("/");
      }}
    />
  );
};

LoginPage.useLayout = false;

export default LoginPage;
