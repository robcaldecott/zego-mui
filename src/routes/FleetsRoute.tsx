import { Trans } from "@lingui/macro";
import { Home } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { FleetsTable, Link } from "@/components";
import type { LocationGenerics } from "@/types";

const FleetsRoute = () => {
  const {
    data: { fleets = [] },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ my: 2 }}>
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Home sx={{ mr: 0.5 }} />
          Fleets
        </Link>
      </Breadcrumbs>

      {/* <Fleets fleets={fleets} /> */}
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
