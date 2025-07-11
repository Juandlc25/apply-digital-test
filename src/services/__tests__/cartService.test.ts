import {
  getCart,
  addToCart,
  removeFromCart,
  isInCart,
  clearCart,
} from "../cartService";
import { Game } from "@/utils/endpoint";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("cartService", () => {
  const mockGame: Game = {
    id: "1",
    genre: "Action",
    image: "/test.jpg",
    name: "Test Game",
    description: "Test description",
    price: 59.99,
    isNew: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe("getCart", () => {
    it("returns empty array when no cart exists", () => {
      const result = getCart();
      expect(result).toEqual([]);
    });

    it("returns parsed cart when it exists", () => {
      const cartData = [mockGame];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cartData));

      const result = getCart();
      expect(result).toEqual(cartData);
    });
  });

  describe("addToCart", () => {
    it("adds game to cart when not already present", () => {
      const cart = [mockGame];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cart));

      const newGame: Game = { ...mockGame, id: "2", name: "New Game" };
      addToCart(newGame);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cart_items",
        JSON.stringify([mockGame, newGame])
      );
    });

    it("does not add duplicate game", () => {
      const cart = [mockGame];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cart));

      addToCart(mockGame);

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("removeFromCart", () => {
    it("removes game from cart", () => {
      const cart = [mockGame, { ...mockGame, id: "2" }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cart));

      removeFromCart("1");

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cart_items",
        JSON.stringify([{ ...mockGame, id: "2" }])
      );
    });
  });

  describe("isInCart", () => {
    it("returns true when game is in cart", () => {
      const cart = [mockGame];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cart));

      const result = isInCart("1");
      expect(result).toBe(true);
    });

    it("returns false when game is not in cart", () => {
      const cart = [mockGame];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(cart));

      const result = isInCart("2");
      expect(result).toBe(false);
    });
  });

  describe("clearCart", () => {
    it("clears the cart", () => {
      clearCart();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cart_items",
        JSON.stringify([])
      );
    });
  });
});
