import { describe, expect,it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { AppHeader } from ".";

describe("AppBar", () => {
  it("renders", () => {
    render(<AppHeader title="Title" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
  });
});
