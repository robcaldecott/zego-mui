import { lazy, Suspense } from "react";
import { ReactLocation, Router } from "@tanstack/react-location";
import { AppShell, Fallback } from "@/components";
import {
  fetchDrivers,
  fetchFleet,
  fetchFleets,
  fetchVehicle,
  fetchVehicles,
} from "@/queries";
import type { LocationGenerics } from "@/types";

const AuthRoute = lazy(() => import("@/routes/AuthRoute"));
const VehiclesRoute = lazy(() => import("@/routes/VehiclesRoute"));
const DetailsRoute = lazy(() => import("@/routes/DetailsRoute"));
const CreateRoute = lazy(() => import("@/routes/CreateRoute"));
const FleetsRoute = lazy(() => import("@/routes/FleetsRoute"));
const FleetRoute = lazy(() => import("@/routes/FleetRoute"));
const DriversRouter = lazy(() => import("@/routes/DriversRoute"));

const location = new ReactLocation<LocationGenerics>();

export const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Router
        location={location}
        routes={[
          {
            element: <AuthRoute />,
            children: [
              {
                element: <AppShell />,
                children: [
                  {
                    path: "/",
                    element: <FleetsRoute />,
                    loader: async () => ({
                      fleets: await fetchFleets(),
                    }),
                  },
                  {
                    path: "fleets/:fleetId/vehicles/add",
                    element: <CreateRoute />,
                    loader: async ({ params: { fleetId } }) => ({
                      fleet: await fetchFleet(fleetId),
                    }),
                  },
                  {
                    path: "fleets/:fleetId/vehicles/:vehicleId",
                    element: <DetailsRoute />,
                    loader: async ({ params: { fleetId, vehicleId } }) => ({
                      fleet: await fetchFleet(fleetId),
                      vehicle: await fetchVehicle(vehicleId),
                    }),
                  },
                  {
                    path: "fleets/:fleetId/vehicles",
                    element: <VehiclesRoute />,
                    loader: async ({ params: { fleetId } }) => ({
                      fleet: await fetchFleet(fleetId),
                      vehicles: await fetchVehicles(),
                    }),
                  },
                  {
                    path: "fleets/:fleetId/drivers",
                    element: <DriversRouter />,
                    loader: async ({ params: { fleetId } }) => ({
                      fleet: await fetchFleet(fleetId),
                      drivers: await fetchDrivers(fleetId),
                    }),
                  },
                  {
                    path: "fleets/:fleetId",
                    element: <FleetRoute />,
                    loader: async ({ params: { fleetId } }) => ({
                      fleet: await fetchFleet(fleetId),
                    }),
                  },
                ],
              },
            ],
          },
        ]}
      />
    </Suspense>
  );
};
