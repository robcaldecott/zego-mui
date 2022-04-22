import { Trans } from "@lingui/macro";
import { Business, Home, Person } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, DriversTable } from "@/components";
import type { LocationGenerics } from "@/types";

const VehiclesRoute = () => {
  const {
    data: { fleet, drivers },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Breadcrumbs sx={{ my: 2 }}>
        <BreadcrumbItem to="/" icon={Home} label={<Trans>Fleets</Trans>} />
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}`}
          icon={Business}
          label={fleet?.name}
        />
        <BreadcrumbItem icon={Person} label={<Trans>Drivers</Trans>} />
      </Breadcrumbs>

      <DriversTable drivers={drivers!} />
    </Container>
  );
};

export default VehiclesRoute;
