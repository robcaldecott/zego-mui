import { Trans } from "@lingui/macro";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { ResponsiveFab, Vehicles } from "@/components";
import type { LocationGenerics } from "@/types";

export const VehiclesRoute = () => {
  const {
    data: { vehicles = [] },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Vehicles vehicles={vehicles} fabPadding />
      <ResponsiveFab
        to="/create"
        icon={Add}
        label={<Trans>Create Vehicle</Trans>}
      />
    </Container>
  );
};
