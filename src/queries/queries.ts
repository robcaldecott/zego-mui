import type { VehiclePayload } from "@/types";
import { http } from "@/utils";

export const fetchVehicles = () => http.get("/api/vehicles");

export const fetchVehicle = (id: string) => http.get(`/api/vehicles/${id}`);

export const deleteVehicle = (id: string) => http.delete(`/api/vehicles/${id}`);

export const createVehicle = (payload: VehiclePayload) =>
  http.post("/api/vehicles", { json: payload });

export const fetchFleets = () => http.get("/api/fleets");

export const fetchFleet = (id: string) => http.get(`/api/fleets/${id}`);
