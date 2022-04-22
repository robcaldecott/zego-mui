import { MakeGenerics } from "@tanstack/react-location";
import type { Driver } from "./driver";
import type { Fleet } from "./fleet";
import type { Vehicle } from "./vehicle";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    vehicles: Vehicle[];
    vehicle: Vehicle;
    fleets: Fleet[];
    fleet: Fleet;
    drivers: Driver[];
  };
  Params: {
    vehicleId: string;
    fleetId: string;
  };
}>;
