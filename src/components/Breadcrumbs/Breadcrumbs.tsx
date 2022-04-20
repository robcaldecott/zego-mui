import { Trans } from "@lingui/macro";
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { Link } from "../Link";

interface BreadcrumbsProps {
  registrationNumber?: string;
}

export const Breadcrumbs = ({ registrationNumber }: BreadcrumbsProps) => (
  <Box marginBottom={2}>
    <MuiBreadcrumbs>
      <Link to="/">
        <Trans>Home</Trans>
      </Link>
      {registrationNumber && <Typography>{registrationNumber}</Typography>}
    </MuiBreadcrumbs>
  </Box>
);
