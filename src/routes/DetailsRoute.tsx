import { Trans } from "@lingui/macro";
import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, Details, LicencePlate } from "@/components";
import type { LocationGenerics } from "@/types";

const DetailsRoute = () => {
  const {
    data: { vehicle, fleet },
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
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}/vehicles`}
          icon={DirectionsCar}
          label={<Trans>Vehicles</Trans>}
        />
        <LicencePlate>{vehicle?.registrationNumber}</LicencePlate>
      </Breadcrumbs>

      <Details vehicle={vehicle} />
    </Container>
  );
};

export default DetailsRoute;
