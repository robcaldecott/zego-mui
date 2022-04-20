import { Trans } from "@lingui/macro";
import { Add } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import {
  AppHeader,
  CreateSimple,
  Details,
  NavDrawer,
  ResponsiveFab,
  Vehicles,
} from "@/components";
import { fetchFleets, fetchVehicle, fetchVehicles } from "@/queries";
import { CreateRoute, DetailsRoute, VehiclesRoute } from "@/routes";
import { FleetsRoute } from "@/routes/FleetsRoute";
import type { LocationGenerics } from "@/types";

const location = new ReactLocation<LocationGenerics>();

export const App = () => {
  return (
    <>
      <AppHeader />

      <Box component="main">
        <Router
          location={location}
          routes={[
            {
              path: "/",
              element: <VehiclesRoute />,
              loader: async () => ({ vehicles: await fetchVehicles() }),
            },
            {
              path: "vehicles/:vehicleId",
              element: <DetailsRoute />,
              loader: async ({ params: { vehicleId } }) => ({
                vehicle: await fetchVehicle(vehicleId),
              }),
            },
            {
              path: "create",
              element: <CreateRoute />,
            },
            {
              path: "fleets",
              element: <FleetsRoute />,
              loader: async () => ({ fleets: await fetchFleets() }),
            },
          ]}
        >
          <NavDrawer toolbar />

          <Box sx={{ ml: "68px" }}>
            <Outlet />
          </Box>
        </Router>
      </Box>
    </>
  );
};
