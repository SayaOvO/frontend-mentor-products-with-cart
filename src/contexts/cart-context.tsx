import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";

export interface CartProduct {
  name: string;
  price: number;
  amount: number;
  image: string;
}

const CartContext = createContext<{
  cartProducts: CartProduct[];
  addProductToCart: (name: string) => void;
  removeProductFromCart: (name: string) => void;
  clearSameProductsFromCart: (name: string) => void;
  resetCart: () => void;
}>({
  cartProducts: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearSameProductsFromCart: () => {},
  resetCart: () => {},
});

export function CartProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState(() =>
    localStorage.getItem("cartProducts")
      ? (JSON.parse(localStorage.getItem("cartProducts")!) as CartProduct[])
      : products.map(({ name, price, image }) => ({
          name,
          price,
          amount: 0,
          image: image.desktop,
        }))
  );

  const addProductToCart = (name: string) => {
    const newProducts = cartProducts.map((product) =>
      product.name === name
        ? {
            ...product,
            amount: product.amount + 1,
          }
        : product
    );
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setCartProducts(newProducts);
  };

  const removeProductFromCart = (name: string) => {
    const newProducts = cartProducts.map((product) =>
      product.name === name
        ? {
            ...product,
            amount: product.amount - 1,
          }
        : product
    );

    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setCartProducts(newProducts);
  };

  const clearSameProductsFromCart = (name: string) => {
    const newProducts = cartProducts.filter((product) => product.name !== name);
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setCartProducts(newProducts);
  };

  const resetCart = () => {
    const newProducts = products.map(({ name, price, image }) => ({
      name,
      price,
      amount: 0,
      image: image.desktop,
    }));
    localStorage.removeItem("cartProducts");
    setCartProducts(newProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        clearSameProductsFromCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartProducts() {
  return useContext(CartContext).cartProducts;
}

export function useAddProductToCart() {
  return useContext(CartContext).addProductToCart;
}

export function useRemoveProductFromCart() {
  return useContext(CartContext).removeProductFromCart;
}

export function useClearSameProductsFromCart() {
  return useContext(CartContext).clearSameProductsFromCart;
}

export function useResetCart() {
  return useContext(CartContext).resetCart;
}
