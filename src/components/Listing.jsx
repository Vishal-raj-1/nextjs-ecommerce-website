"use client";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import InfiniteScroll from "react-infinite-scroll-component";

export const revalidate = 3600;

export function Listing() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  const getProducts = async () => {
    try {
      const result = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${page*12}`
      );
      const productList = await result.json();

      if (productList.products.length === 0) {
        setHasMore(false); 
        return;
      }

      setProducts((prevProducts) => [...prevProducts, ...productList.products]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInfiniteScroll = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={handleInfiniteScroll}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {products &&
        products.map((product, i) => (
          <div key={i} className="rounded-md border">
            <img
              src={product.images[0]}
              alt={product.title}
              className="aspect-[3/4] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {product.title}
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                {product.description}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-black-1 shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
    </InfiniteScroll>
  );
}
