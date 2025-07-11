// Unit test for GameCard component (Apply Digital challenge)
import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "../GameCard";
import { Game } from "@/utils/endpoint";

describe("GameCard", () => {
  const game: Game = {
    id: "1",
    genre: "Action",
    image: "/game-images/cyberpunk2077.jpeg",
    name: "Cyberpunk 2077",
    description: "Test description",
    price: 59.99,
    isNew: true,
  };

  it("renders game info and new label", () => {
    render(<GameCard game={game} inCart={false} onCartToggle={() => {}} />);
    expect(screen.getByText("Cyberpunk 2077")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
    expect(screen.getByText("New")).toBeDefined();
    expect(screen.getByText("$59.99")).toBeDefined();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeDefined();
  });

  it("shows Remove if inCart is true", () => {
    render(<GameCard game={game} inCart={true} onCartToggle={() => {}} />);
    expect(screen.getByRole("button", { name: /remove/i })).toBeDefined();
  });

  it("calls onCartToggle when button is clicked", () => {
    const onCartToggle = jest.fn();
    render(<GameCard game={game} inCart={false} onCartToggle={onCartToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onCartToggle).toHaveBeenCalledWith(game);
  });
});
