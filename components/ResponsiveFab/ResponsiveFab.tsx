import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { Box, Fab } from "@mui/material";

interface ResponsiveFabProps {
  icon: ElementType;
  label?: ReactNode;
  href?: string;
}

export const ResponsiveFab = forwardRef<HTMLAnchorElement, ResponsiveFabProps>(
  ({ icon: Icon, label, ...props }, ref) => (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: 16,
          bottom: 16,
        }}
      >
        <Fab color="primary" component="a" ref={ref} {...props}>
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
        <Fab
          component="a"
          color="primary"
          variant="extended"
          ref={ref}
          {...props}
        >
          <Icon sx={{ mr: 1 }} />
          {label}
        </Fab>
      </Box>
    </>
  )
);

ResponsiveFab.displayName = "ResponsiveFab";
