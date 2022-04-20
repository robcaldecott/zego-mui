import { t } from "@lingui/macro";
import { CurrencyPound, DirectionsCar, Home } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  SxProps,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Link } from "@/components";

const WIDTH = 68;

const items = [
  {
    href: "/",
    label: t`Home`,
    icon: <Home fontSize="large" />,
  },
  {
    href: "/fleets",
    label: t`Fleets`,
    icon: <DirectionsCar fontSize="large" />,
  },
  {
    href: "/billing",
    label: t`Billing`,
    icon: <CurrencyPound fontSize="large" />,
  },
];

interface NavDrawerProps {
  toolbar?: boolean;
  sx?: SxProps;
}

export const NavDrawer = ({ toolbar, sx }: NavDrawerProps) => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: WIDTH, ...sx }}>
      {/* Spacer for the main header */}
      {toolbar && (
        <>
          <Toolbar />
          <Divider />
        </>
      )}
      {/* The main navigation items */}
      <List>
        {items.map((item) => (
          <Tooltip key={item.href} title={item.label} placement="right" arrow>
            <ListItemButton component={Link} to={item.href} preload={1}>
              <ListItemIcon aria-label={item.label} sx={{ minWidth: 0 }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};
