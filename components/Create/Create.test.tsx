import { PathParams, rest } from "msw";
import { setupServer } from "msw/node";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Vehicle } from "@/types";
import { render, screen, userEvent } from "@/utils/test-utils";
import { Create } from "./Create";

describe("Create", () => {
  const server = setupServer(
    rest.post<Vehicle, PathParams, Vehicle>("/api/vehicles", (req, res, ctx) =>
      res(ctx.json({ ...req.body }))
    )
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("submits", async () => {
    render(<Create />);
    // Check for the "Home" link
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    // Title
    expect(
      screen.getByRole("heading", { name: /create new vehicle/i })
    ).toBeInTheDocument();
    // Complete the form
    await userEvent.click(screen.getByLabelText(/make/i));
    await userEvent.click(await screen.findByRole("option", { name: /audi/i }));
    await userEvent.type(screen.getByRole("textbox", { name: /model/i }), "A4");
    await userEvent.type(
      screen.getByRole("textbox", { name: /variant/i }),
      "Saloon"
    );
    await userEvent.click(screen.getByLabelText(/fuel/i));
    await userEvent.click(screen.getByRole("option", { name: /electric/i }));
    await userEvent.click(screen.getByLabelText(/colour/i));
    await userEvent.click(screen.getByRole("option", { name: /black/i }));
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
      "1"
    );
    await userEvent.type(
      screen.getByLabelText(/registration date/i),
      "01/01/2000"
    );
    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /create/i }));
    // Check the buttons are disabled
    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDisabled();
  });

  it("resets the form", async () => {
    render(<Create />);
    // Complete the form
    await userEvent.click(screen.getByLabelText(/make/i));
    await userEvent.click(await screen.findByRole("option", { name: /audi/i }));
    await userEvent.type(screen.getByRole("textbox", { name: /model/i }), "A4");
    await userEvent.type(
      screen.getByRole("textbox", { name: /variant/i }),
      "Saloon"
    );
    await userEvent.click(screen.getByLabelText(/fuel/i));
    await userEvent.click(screen.getByRole("option", { name: /electric/i }));
    await userEvent.click(screen.getByLabelText(/colour/i));
    await userEvent.click(screen.getByRole("option", { name: /black/i }));
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
      screen.getByRole("textbox", { name: /registration date/i }),
      "01/01/2022"
    );
    // Reset
    await userEvent.click(screen.getByRole("button", { name: /reset/i }));
    // Check that the fields are empty
    expect(
      screen.queryByRole("button", { name: /audi/i })
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toHaveValue("");
    expect(screen.getByLabelText(/variant/i)).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: /electric/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /black/i })
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/registration number/i)).toHaveValue("");
    expect(screen.getByLabelText(/vin/i)).toHaveValue("");
    expect(screen.getByLabelText(/mileage/i)).toHaveValue("");
    expect(screen.getByLabelText(/registration date/i)).toHaveValue("");
  });

  it("validates the form", async () => {
    render(<Create />);
    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /create/i }));
    expect(screen.getByText(/please select a make/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter the model/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter the variant/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a fuel type/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a colour/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter the registration number/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter the vin/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter a valid mileage/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter the registration date/i)
    ).toBeInTheDocument();
  });
});
