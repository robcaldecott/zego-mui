import { DefaultRequestBody, PathParams, rest } from "msw";
import { Driver, Fleet, Vehicle } from "@/types";
import {
  colors,
  drivers,
  fleets,
  fuelTypes,
  manufacturers,
  vehicles,
} from "./data";

export const handlers = [
  // Fetch all fleets
  rest.get<DefaultRequestBody, PathParams, Fleet[]>(
    "https://zego.backend/fleets",
    (req, res, ctx) => res(ctx.delay(), ctx.json(fleets))
  ),
  // Fetch a fleet
  rest.get<DefaultRequestBody, { fleetId: string }, Fleet>(
    "https://zego.backend/fleets/:fleetId",
    (req, res, ctx) => {
      const { fleetId } = req.params;
      const fleet = fleets.find((fleet) => fleet.uuid === fleetId);
      return fleet ? res(ctx.delay(), ctx.json(fleet)) : res(ctx.status(404));
    }
  ),
  // Fetch a list of vehicles
  rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
    "https://zego.backend/fleets/:fleetId/vehicles",
    (req, res, ctx) => res(ctx.delay(), ctx.json(vehicles))
  ),
  // Fetch a vehicle
  rest.get<DefaultRequestBody, { vehicleId: string }, Vehicle>(
    "https://zego.backend/fleets/:fleetId/vehicles/:vehicleId",
    (req, res, ctx) => {
      const { vehicleId } = req.params;
      const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      return vehicle
        ? res(ctx.delay(), ctx.json(vehicle))
        : res(ctx.status(404));
    }
  ),
  // Fetch config used when adding a vehicle
  rest.get<
    DefaultRequestBody,
    PathParams,
    { colors: string[]; fuelTypes: string[]; manufacturers: string[] }
  >("https://zego.backend/fleets/:fleetId/vehicleConfig", (req, res, ctx) =>
    res(
      ctx.delay(),
      ctx.json({
        colors: colors(),
        fuelTypes: fuelTypes(),
        manufacturers: manufacturers(),
      })
    )
  ),
  // Add a new vehicle
  rest.post<Omit<Vehicle, "id">, PathParams, Vehicle>(
    "https://zego.backend/fleets/:fleetId/vehicles",
    (req, res, ctx) => res(ctx.delay(), ctx.json({ id: "id", ...req.body }))
  ),
  // Delete a vehicle
  rest.delete<DefaultRequestBody, { vehicleId: string }, { id: string }>(
    "https://zego.backend/fleets/:fleetId/vehicles/:vehicleId",
    (req, res, ctx) => {
      const { vehicleId } = req.params;
      return res(ctx.delay(), ctx.json({ id: vehicleId }));
    }
  ),
  // Fetch drivers
  rest.get<DefaultRequestBody, PathParams, Driver[]>(
    "https://zego.backend/fleets/:fleetId/drivers",
    (req, res, ctx) => res(ctx.delay(), ctx.json(drivers))
  ),
];
