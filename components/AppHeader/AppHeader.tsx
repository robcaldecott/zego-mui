import { Brightness3, WbSunny } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { lightBlue, yellow } from "@mui/material/colors";
import { useThemeMode } from "@/providers";
import { ZegoFleetHorizontal } from "../ZegoFleetHorizontal";

export const AppHeader = () => {
  const { mode, toggle } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Zego logo */}
        <ZegoFleetHorizontal height={24} color="white" />

        {/* Button used to toggle light/dark mode */}
        <IconButton color="inherit" onClick={() => toggle()} edge="end">
          {mode === "light" ? (
            <Brightness3 sx={{ color: lightBlue["100"] }} />
          ) : (
            <WbSunny sx={{ color: yellow["A200"] }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
