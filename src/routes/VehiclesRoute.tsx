import { Trans } from "@lingui/macro";
import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { Link, VehiclesTable } from "@/components";
import type { LocationGenerics } from "@/types";

const VehiclesRoute = () => {
  const {
    data: { fleet, vehicles },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
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
          <DirectionsCar sx={{ mr: 0.5 }} />
          Vehicles
        </Typography>
      </Breadcrumbs>

      {/* <Fleets fleets={fleets} /> */}
      <VehiclesTable rows={vehicles} />
    </Container>
  );
};

export default VehiclesRoute;

// import { Trans } from "@lingui/macro";
// import { Add } from "@mui/icons-material";
// import { Container } from "@mui/material";
// import { useMatch } from "@tanstack/react-location";
// import { ResponsiveFab, Vehicles } from "@/components";
// import type { LocationGenerics } from "@/types";

// const VehiclesRoute = () => {
//   const {
//     data: { vehicles = [] },
//   } = useMatch<LocationGenerics>();

//   return (
//     <Container maxWidth="lg" sx={{ pt: 4 }}>
//       <Vehicles vehicles={vehicles} fabPadding />
//       <ResponsiveFab
//         to="/create"
//         icon={Add}
//         label={<Trans>Create Vehicle</Trans>}
//       />
//     </Container>
//   );
// };

// export default VehiclesRoute;
