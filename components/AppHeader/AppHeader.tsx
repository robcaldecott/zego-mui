import { useState } from "react";
import {
  AccountCircle,
  Brightness3,
  Logout,
  WbSunny,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import { lightBlue, yellow } from "@mui/material/colors";
import { useAuth, useThemeMode } from "@/providers";
import { Link } from "../Link";
import { ZegoFleetHorizontal } from "../ZegoFleetHorizontal";

const ImageLink = styled(Link)({ display: "flex" });

export const AppHeader = () => {
  const { mode, toggle } = useThemeMode();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Zego logo */}
        <ImageLink href="/">
          <ZegoFleetHorizontal height={24} color="white" />
        </ImageLink>

        <Stack direction="row" spacing={2}>
          {/* Button used to toggle light/dark mode */}
          <IconButton color="inherit" onClick={() => toggle()}>
            {mode === "light" ? (
              <Brightness3 sx={{ color: lightBlue["100"] }} />
            ) : (
              <WbSunny sx={{ color: yellow["A200"] }} />
            )}
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "primary.dark",
              color: "common.white",
              cursor: "pointer",
            }}
            role="button"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            JS
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <ListSubheader>John Smith</ListSubheader>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
