import { type Product as ProductType } from "./types/product";
import * as styles from "./App.module.css";
import { Cart } from "./components/cart";
import { ProductsList } from "./components/products-list";
import { CartProvider } from "./contexts/cart-context";
import useSWR from "swr";

const fetcher = async (
  ...args: Parameters<typeof fetch>
): Promise<ProductType[]> => {
  const response = await fetch(...args);
  return await response.json();
};
export default function App() {
  const { data, isLoading, error } = useSWR<ProductType[]>(
    "./assets/data.json",
    fetcher
  );

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error || !data) {
    return <p>Erro is happening when fetch</p>;
  }
  return (
    <div className={styles["container"]}>
      <CartProvider products={data}>
        <ProductsList products={data} />
        <Cart />
      </CartProvider>
    </div>
  );
}
