"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const menuItems = [
  {
    name: "Tops",
    href: "#",
  },
  {
    name: "Shirts",
    href: "#",
  },
  {
    name: "Shoes",
    href: "#",
  },
  {
    name: "Bags",
    href: "#",
  },
  {
    name: "Watches",
    href: "#",
  },
  {
    name: "Jewellery",
    href: "#",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useSelector((state) => state.cart.items);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-black-1 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 md:px-8">
        <div className="hidden md:flex items-center space-x-2">
          <span className="font-bold">DevUI</span>
        </div>
        <div className="hidden md:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex space-x-4">
          <Image
            src="/assets/perm_identity.svg"
            width={24}
            height={24}
            alt="User Profile"
          />
          <Link href="/cart">
            <Image
              src="/assets/shopping_cart.svg"
              width={24}
              height={24}
              alt="Shopping Cart"
            />
          </Link>

          <div className="w-5 h-5 bg-white relative bottom-2 right-12 rounded-full flex items-center justify-center">
            <p className="text-red-600 font-bold text-sm">{items.length}</p>
          </div>
        </div>
        <div className="md:hidden w-full flex justify-between">
          <Menu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer text-white"
          />
          <div className="md:hidden flex space-x-4">
            <Image
              src="/assets/perm_identity.svg"
              width={24}
              height={24}
              alt="User Profile"
            />
            <Image
              src="/assets/shopping_cart.svg"
              width={24}
              height={24}
              alt="Shopping Cart"
            />
            <div className="w-5 h-5 bg-white relative bottom-2 right-12 rounded-full flex items-center justify-center">
              <p className="text-red-600 font-bold text-sm">{items.length}</p>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 origin-top-right transform p-2 transition md:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center justify-end">
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
