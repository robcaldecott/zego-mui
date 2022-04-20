import { describe, expect, it, vi } from "vitest";
import { render, screen, userEvent } from "@/utils/test-utils";
import { SearchField } from ".";

describe("SearchField", () => {
  it("renders", async () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();
    render(
      <SearchField
        value="value"
        onChange={handleChange}
        onClear={handleClear}
      />
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Search"
    );
    // It handles change events
    await userEvent.type(screen.getByRole("textbox"), "filter");
    expect(handleChange).toHaveBeenCalled();
    // It clears
    await userEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(handleClear).toHaveBeenCalled();
  });
});
