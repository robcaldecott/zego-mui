import { Trans } from "@lingui/macro";
import { Home } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, FleetsTable } from "@/components";
import type { LocationGenerics } from "@/types";

const FleetsRoute = () => {
  const {
    data: { fleets = [] },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ my: 2 }}>
        <BreadcrumbItem icon={Home} label={<Trans>Fleets</Trans>} />
      </Breadcrumbs>

      <FleetsTable
        rows={fleets.map((fleet) => ({
          ...fleet,
          manager: fleet.manager.name,
          country: fleet.country.displayName,
        }))}
      />
    </Container>
  );
};

export default FleetsRoute;
