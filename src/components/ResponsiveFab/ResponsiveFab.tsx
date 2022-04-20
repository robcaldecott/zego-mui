import type { ElementType, ReactNode } from "react";
import { Box, Fab } from "@mui/material";
import { Link } from "../Link";

interface ResponsiveFabProps {
  icon: ElementType;
  label?: ReactNode;
  to: string;
}

export const ResponsiveFab = ({
  icon: Icon,
  label,
  to,
}: ResponsiveFabProps) => (
  <>
    <Box
      sx={{
        display: { xs: "block", sm: "none" },
        position: "fixed",
        right: 16,
        bottom: 16,
      }}
    >
      <Fab color="primary" component={Link} to={to}>
        <Icon />
      </Fab>
    </Box>

    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        position: "fixed",
        right: 32,
        bottom: 32,
      }}
    >
      <Fab component={Link} to={to} color="primary" variant="extended">
        <Icon sx={{ mr: 1 }} />
        {label}
      </Fab>
    </Box>
  </>
);
