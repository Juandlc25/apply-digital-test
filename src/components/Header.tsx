import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

import CartCountBadge from "./CartCountBadge";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 md:px-16 py-4 bg-gray-200">
      <Link
        href="/"
        className="text-xl leading-6 font-bold text-gray-600 tracking-[0.4px]"
      >
        GamerShop
      </Link>
      <Link href="/cart" className="relative">
        <MdOutlineShoppingCart className="text-gray-600" size={24} />
        <CartCountBadge />
      </Link>
    </header>
  );
}
