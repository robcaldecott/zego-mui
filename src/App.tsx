import { lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { AppHeader, NavDrawer } from "@/components";
import { fetchFleets, fetchVehicle, fetchVehicles } from "@/queries";
import type { LocationGenerics } from "@/types";

const VehiclesRoute = lazy(() => import("@/routes/VehiclesRoute"));
const DetailsRoute = lazy(() => import("@/routes/DetailsRoute"));
const CreateRoute = lazy(() => import("@/routes/CreateRoute"));
const FleetsRoute = lazy(() => import("@/routes/FleetsRoute"));

const location = new ReactLocation<LocationGenerics>();

export const App = () => {
  return (
    <>
      <AppHeader />

      <Box component="main">
        <Suspense fallback={<div>Loading</div>}>
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
        </Suspense>
      </Box>
    </>
  );
};
