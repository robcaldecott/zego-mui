import { ReactNode } from "react";
import { Box } from "@mui/material";
// import Head from "next/head";
import { AppHeader } from "../AppHeader";
import { NavDrawer } from "../NavDrawer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    {/* <Head>
      <title>Zego Fleet</title>
    </Head> */}

    <AppHeader />

    <Box component="main">
      <NavDrawer toolbar />

      <Box sx={{ ml: "68px" }}>{children}</Box>
    </Box>
  </>
);
