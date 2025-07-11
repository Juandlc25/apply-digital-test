import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";
import { Game } from "@/utils/endpoint";

describe("CartItem", () => {
  const mockGame: Game = {
    id: "1",
    genre: "Action",
    image: "/game-images/cyberpunk2077.jpeg",
    name: "Cyberpunk 2077",
    description: "An open-world, action-adventure story set in Night City.",
    price: 59.99,
    isNew: true,
  };

  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders game information correctly", () => {
    render(<CartItem game={mockGame} onRemove={mockOnRemove} isLast={false} />);

    expect(screen.getByText("Cyberpunk 2077")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
    expect(
      screen.getByText(
        "An open-world, action-adventure story set in Night City."
      )
    ).toBeDefined();
    expect(screen.getByText("$59.99")).toBeDefined();
    expect(screen.getByText("New")).toBeDefined();
  });

  it("calls onRemove when remove button is clicked", () => {
    render(<CartItem game={mockGame} onRemove={mockOnRemove} isLast={false} />);

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith("1");
  });

  it("does not show New label when isNew is false", () => {
    const gameWithoutNew = { ...mockGame, isNew: false };
    render(
      <CartItem game={gameWithoutNew} onRemove={mockOnRemove} isLast={false} />
    );

    expect(screen.queryByText("New")).toBeNull();
  });

  it("applies border styling based on isLast prop", () => {
    const { rerender } = render(
      <CartItem game={mockGame} onRemove={mockOnRemove} isLast={false} />
    );

    let container = screen.getByTestId("cart-item");
    expect(container.className).toContain("border-b");

    rerender(
      <CartItem game={mockGame} onRemove={mockOnRemove} isLast={true} />
    );
    container = screen.getByTestId("cart-item");
    expect(container.className).not.toContain("border-b");
  });
});
