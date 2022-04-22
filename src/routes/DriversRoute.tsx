import { Trans } from "@lingui/macro";
import { Business, Home, Person } from "@mui/icons-material";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { DriversTable, Link } from "@/components";
import type { LocationGenerics } from "@/types";

const VehiclesRoute = () => {
  const {
    data: { fleet, drivers },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Breadcrumbs sx={{ my: 2 }}>
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Home sx={{ mr: 0.5 }} />
          Fleets
        </Link>

        <Link
          to={`/fleets/${fleet?.uuid}`}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Business sx={{ mr: 0.5 }} />
          {fleet?.name}
        </Link>

        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Person sx={{ mr: 0.5 }} />
          Drivers
        </Typography>
      </Breadcrumbs>

      <DriversTable drivers={drivers!} />
    </Container>
  );
};

export default VehiclesRoute;
