"use client";

import { Provider } from "react-redux";
import ShoppingCart from "@/components/shoppingCart";
import { store } from "@/redux/store";
import { Header } from "@/components/Header";

export default function Page() {
  
  return (
    <Provider store={store}>
      <div className="min-h-screen">
        <Header />
        <ShoppingCart />
      </div>
    </Provider>
  );
}
