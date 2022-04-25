import { Trans } from "@lingui/macro";
import { Box } from "@mui/material";

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      p: 2,
      bgcolor: "common.black",
      color: "common.white",
      typography: "body2",
      textAlign: "right",
    }}
  >
    <Trans>&copy; Zego 2022</Trans>
  </Box>
);
