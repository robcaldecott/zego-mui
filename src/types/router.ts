import { MakeGenerics } from "@tanstack/react-location";
import type { Fleet } from "./fleet";
import type { Vehicle } from "./vehicle";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    vehicles: Vehicle[];
    vehicle: Vehicle;
    fleets: Fleet[];
    fleet: Fleet;
  };
  Params: {
    vehicleId: string;
    fleetId: string;
  };
}>;
