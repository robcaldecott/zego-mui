import { describe, expect,it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { Layout } from ".";

describe("Layout", () => {
  it("renders", () => {
    render(<Layout>Content</Layout>);
    // We should have a header
    expect(screen.getByRole("banner")).toHaveTextContent(/vehicle manager/i);
    // We should have context
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
});
