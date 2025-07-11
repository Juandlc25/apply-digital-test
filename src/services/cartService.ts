import { Game } from "@/utils/endpoint";

const CART_KEY = "cart_items";

function notifyCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

export function getCart(): Game[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: Game[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(game: Game) {
  const cart = getCart();
  if (!cart.find((g) => g.id === game.id)) {
    cart.push(game);
    saveCart(cart);
    notifyCartUpdate();
  }
}

export function removeFromCart(gameId: string) {
  const cart = getCart().filter((g) => g.id !== gameId);
  saveCart(cart);
  notifyCartUpdate();
}

export function isInCart(gameId: string): boolean {
  return getCart().some((g) => g.id === gameId);
}

export function clearCart() {
  saveCart([]);
  notifyCartUpdate();
}
