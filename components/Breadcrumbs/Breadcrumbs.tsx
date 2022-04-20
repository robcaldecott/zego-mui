import { Trans } from "@lingui/macro";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

interface BreadcrumbsProps {
  registrationNumber?: string;
}

export const Breadcrumbs = ({ registrationNumber }: BreadcrumbsProps) => (
  <Box marginBottom={2}>
    <MuiBreadcrumbs>
      <NextLink href="/" passHref>
        <Link>
          <Trans>Home</Trans>
        </Link>
      </NextLink>
      {registrationNumber && <Typography>{registrationNumber}</Typography>}
    </MuiBreadcrumbs>
  </Box>
);
