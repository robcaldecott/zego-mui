import { Trans } from "@lingui/macro";
import { Add, Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, CreateSimple } from "@/components";
import type { LocationGenerics } from "@/types";

const CreateRoute = () => {
  const {
    data: { fleet },
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
        <BreadcrumbItem icon={Add} label={<Trans>Add vehicle</Trans>} />
      </Breadcrumbs>

      <Container maxWidth="md">
        <CreateSimple />
      </Container>
    </Container>
  );
};

export default CreateRoute;
