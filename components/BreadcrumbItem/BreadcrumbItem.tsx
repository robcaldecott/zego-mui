import { ElementType, ReactNode } from "react";
import { Typography } from "@mui/material";
import { Link } from "../Link";

interface LabelProps {
  icon: ElementType;
  label: ReactNode;
}

const Label = ({ icon: Icon, label }: LabelProps) => (
  <>
    <Icon sx={{ mr: 0.5 }} />
    {label}
  </>
);

interface BreadcrumbItemProps extends LabelProps {
  to?: string;
}

export const BreadcrumbItem = ({ to, icon, label }: BreadcrumbItemProps) => {
  const sx = { display: "flex", alignItems: "center" };

  return to ? (
    <Link href={to} sx={sx}>
      <Label icon={icon} label={label} />
    </Link>
  ) : (
    <Typography sx={{ ...sx, color: "text.primary" }}>
      <Label icon={icon} label={label} />
    </Typography>
  );
};
