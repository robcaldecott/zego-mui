import { ReactNode } from "react";
import { Paper, Typography } from "@mui/material";

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => (
  <Paper square elevation={4} sx={{ p: 2 }}>
    <Typography component="h1" variant="h5" sx={{ fontWeight: "medium" }}>
      {children}
    </Typography>
  </Paper>
);
