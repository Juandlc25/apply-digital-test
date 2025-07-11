import { render, screen } from "@testing-library/react";
import OrderSummary from "../OrderSummary";
import { Game } from "@/utils/endpoint";

describe("OrderSummary", () => {
  const mockGames: Game[] = [
    {
      id: "1",
      genre: "Action",
      image: "/game-images/cyberpunk2077.jpeg",
      name: "Cyberpunk 2077",
      description: "Test description",
      price: 59.99,
      isNew: true,
    },
    {
      id: "2",
      genre: "RPG",
      image: "/game-images/thewitcher3.jpeg",
      name: "The Witcher 3",
      description: "Test description 2",
      price: 39.99,
      isNew: false,
    },
  ];

  it("renders order summary with correct totals", () => {
    render(<OrderSummary games={mockGames} />);

    expect(screen.getByText("Order Summary")).toBeDefined();
    expect(screen.getByText("2 items")).toBeDefined();
    expect(screen.getByText("$59.99")).toBeDefined();
    expect(screen.getByText("$39.99")).toBeDefined();
    expect(screen.getByText("$99.98")).toBeDefined();
  });

  it("renders empty state when no games", () => {
    render(<OrderSummary games={[]} />);

    expect(screen.getByText("Order Summary")).toBeDefined();
    expect(screen.getByText("0 items")).toBeDefined();
    expect(screen.getByText("$0.00")).toBeDefined();
  });

  it("calculates total correctly with multiple items", () => {
    const gamesWithMultipleItems = [
      ...mockGames,
      {
        id: "3",
        genre: "Adventure",
        image: "/game-images/zeldabotw.jpeg",
        name: "Zelda BOTW",
        description: "Test description 3",
        price: 29.99,
        isNew: true,
      },
    ];

    render(<OrderSummary games={gamesWithMultipleItems} />);

    expect(screen.getByText("3 items")).toBeDefined();
    expect(screen.getByText("$129.97")).toBeDefined();
  });
});
