import { Star } from "@mui/icons-material";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { ResponsiveFab } from ".";

describe("ResponsiveFab", () => {
  it("renders", () => {
    render(
      <ResponsiveFab to="/" icon={Star} label="Caption" aria-label="Label" />
    );
    expect(screen.getAllByRole("link", { name: /label/i })).toHaveLength(2);
    expect(screen.getByText(/caption/i)).toBeInTheDocument();
  });
});
