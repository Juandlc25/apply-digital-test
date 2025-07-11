import { render, screen } from "@testing-library/react";
import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  it("renders loading spinner", () => {
    render(<LoadingIndicator />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeDefined();
  });

  it("has correct styling classes", () => {
    render(<LoadingIndicator />);
    const container = screen.getByTestId("loading-spinner").parentElement;
    expect(container?.className).toContain("flex");
    expect(container?.className).toContain("justify-center");
    expect(container?.className).toContain("items-center");
  });
});
