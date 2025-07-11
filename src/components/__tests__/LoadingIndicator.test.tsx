import { render, screen } from "@testing-library/react";
import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  it("renders loading text", () => {
    render(<LoadingIndicator />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("has correct styling classes", () => {
    render(<LoadingIndicator />);
    const container = screen.getByText("Loading...").parentElement;
    expect(container?.className).toContain("flex");
    expect(container?.className).toContain("justify-center");
    expect(container?.className).toContain("items-center");
  });
});
