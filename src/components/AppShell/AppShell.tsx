import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-location";
import { AppHeader } from "../AppHeader";
import { Footer } from "../Footer";

export const AppShell = () => (
  <>
    <AppHeader />
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  </>
);
