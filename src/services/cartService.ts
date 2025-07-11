import { Game } from "@/utils/endpoint";

const CART_KEY = "cart_items";

function notifyCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

export function getCart(): Game[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = safeLocalStorageGet(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
}

export function saveCart(cart: Game[]): void {
  safeLocalStorageSet(CART_KEY, JSON.stringify(cart));
}

export function addToCart(game: Game): void {
  try {
    const cart = getCart();
    if (!cart.find((g) => g.id === game.id)) {
      cart.push(game);
      saveCart(cart);
      notifyCartUpdate();
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

export function removeFromCart(gameId: string): void {
  try {
    const cart = getCart().filter((g) => g.id !== gameId);
    saveCart(cart);
    notifyCartUpdate();
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}

export function isInCart(gameId: string): boolean {
  try {
    return getCart().some((g) => g.id === gameId);
  } catch (error) {
    console.error("Error checking cart:", error);
    return false;
  }
}

export function clearCart(): void {
  try {
    saveCart([]);
    notifyCartUpdate();
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}
