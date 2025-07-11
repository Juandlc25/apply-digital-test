import { render, screen } from "@testing-library/react";
import CartCountBadge from "../CartCountBadge";
import { getCart } from "@/services/cartService";

// Mock the cartService
jest.mock("@/services/cartService", () => ({
  getCart: jest.fn(),
}));

describe("CartCountBadge", () => {
  const mockGetCart = getCart as jest.MockedFunction<typeof getCart>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart count when items exist", () => {
    mockGetCart.mockReturnValue([
      { id: "1", name: "Game 1", price: 59.99 } as any,
      { id: "2", name: "Game 2", price: 39.99 } as any,
    ]);

    render(<CartCountBadge />);
    expect(screen.getByText("2")).toBeDefined();
  });

  it("does not render badge when cart is empty", () => {
    mockGetCart.mockReturnValue([]);

    render(<CartCountBadge />);
    expect(screen.queryByText("0")).toBeNull();
  });

  it("renders correct count for single item", () => {
    mockGetCart.mockReturnValue([
      { id: "1", name: "Game 1", price: 59.99 } as any,
    ]);

    render(<CartCountBadge />);
    expect(screen.getByText("1")).toBeDefined();
  });
});
