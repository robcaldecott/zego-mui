import { PathParams, rest } from "msw";
import { setupServer } from "msw/node";
import { afterAll,beforeAll, expect, it } from "vitest";
import type { Vehicle } from "@/types";
import { render, screen, userEvent } from "@/utils/test-utils";
import { CreateSimple } from "./CreateSimple";

const server = setupServer(
  rest.post<Vehicle, PathParams, Vehicle>("/api/vehicles", (req, res, ctx) =>
    res(ctx.json({ ...req.body }))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it("submits", async () => {
  render(<CreateSimple />);
  // Check for the "Home" link
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  // Title
  expect(
    screen.getByRole("heading", { name: /create new vehicle/i })
  ).toBeInTheDocument();
  // Complete the form
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /make/i }),
    ["Audi"]
  );
  await userEvent.type(screen.getByRole("textbox", { name: /model/i }), "A4");
  await userEvent.type(
    screen.getByRole("textbox", { name: /variant/i }),
    "Saloon"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /fuel/i }),
    ["Gasoline"]
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /colour/i }),
    ["Black"]
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /registration number/i }),
    "ABC 123"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /vin/i }),
    "ABCDEF1234567890"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /mileage/i }),
    "12345"
  );
  await userEvent.type(
    screen.getByLabelText(/registration date/i),
    "1999-12-31"
  );
  // Submit the form
  await userEvent.click(screen.getByRole("button", { name: /create/i }));
  // Check the buttons are disabled
  expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /reset/i })).toBeDisabled();
  // Check all the fields are disabled
  expect(screen.getByRole("combobox", { name: /make/i })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /model/i })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /variant/i })).toBeDisabled();
  expect(screen.getByRole("combobox", { name: /fuel/i })).toBeDisabled();
  expect(screen.getByRole("combobox", { name: /colour/i })).toBeDisabled();
  expect(
    screen.getByRole("textbox", { name: /registration number/i })
  ).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /vin/i })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /mileage/i })).toBeDisabled();
  expect(screen.getByLabelText(/registration date/i)).toBeDisabled();
});
