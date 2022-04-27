import { getCookie } from "cookies-next";
import type { GetServerSidePropsContext } from "next";

export const withAuth = (gssp: any) => {
  return async (context: GetServerSidePropsContext) => {
    const token = getCookie("token", context);
    if (token === undefined) {
      // If we're not logged in then redirect to the login page
      return {
        redirect: {
          destination: `/login?redirectTo=${context.resolvedUrl}`,
          permanent: false,
        },
      };
    }
    return await gssp(context);
  };
};
