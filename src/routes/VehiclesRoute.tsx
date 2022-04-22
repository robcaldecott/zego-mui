import { Trans } from "@lingui/macro";
import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, VehiclesTable } from "@/components";
import type { LocationGenerics } from "@/types";

const VehiclesRoute = () => {
  const {
    data: { fleet, vehicles },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ my: 2 }}>
        <BreadcrumbItem to="/" icon={Home} label={<Trans>Fleets</Trans>} />
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}`}
          icon={Business}
          label={fleet?.name}
        />
        <BreadcrumbItem icon={DirectionsCar} label={<Trans>Vehicles</Trans>} />
      </Breadcrumbs>

      <VehiclesTable rows={vehicles!} />
    </Container>
  );
};

export default VehiclesRoute;
