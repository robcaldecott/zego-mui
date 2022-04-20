import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, screen, userEvent,waitFor, within } from "@/utils/test-utils";
import { Details } from "./Details";

const replace = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({ replace }),
}));

describe("Details", () => {
  const vehicle = {
    id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
    manufacturer: "Volkswagen",
    model: "Explorer",
    type: "Cargo Van",
    fuel: "Gasoline",
    vin: "1USTAN9Z5MNT86399",
    color: "teal",
    mileage: 70609,
    registrationDate: "2005-07-08T16:58:36.380Z",
    registrationNumber: "TE52 HWW",
  };

  const server = setupServer();

  beforeAll(() => server.listen());
  beforeEach(() => {
    replace.mockReset();
  });
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  it("loads vehicle details", async () => {
    render(<Details vehicle={vehicle} />);
    // Wait for the details to load
    const card = within(screen.getByLabelText(/vehicle details/i));
    // Check the headings
    expect(
      card.getByText(/volkswagen explorer cargo van/i)
    ).toBeInTheDocument();
    expect(card.getByText(/te52 hww/i)).toBeInTheDocument();
    // Check the fields
    expect(card.getByLabelText(/colour/i)).toHaveTextContent(/teal/i);
    expect(card.getByLabelText(/fuel/i)).toHaveTextContent(/gasoline/i);
    expect(card.getByLabelText(/vin/i)).toHaveTextContent(/1ustan9z5mnt86399/i);
    expect(card.getByLabelText(/mileage/i)).toHaveTextContent(/70,609/i);
    expect(card.getByLabelText(/registration date/i)).toHaveTextContent(
      /8 July 2005/i
    );
  });

  it("deletes the vehicle", async () => {
    server.use(
      rest.delete("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.json({ id: req.params.id }))
      )
    );
    render(<Details vehicle={vehicle} />);
    // Click the Delete button
    await userEvent.click(
      screen.getByRole("button", { name: /delete vehicle/i })
    );
    // Check the dialog is correct
    const dialog = within(
      screen.getByRole("dialog", { name: /delete vehicle/i })
    );
    expect(
      dialog.getByText(/are you really sure you want to delete this vehicle\?/i)
    ).toBeInTheDocument();
    // Delete
    await userEvent.click(dialog.getByRole("button", { name: /delete/i }));
    // We should route back to the home page
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/"));
  });
});
