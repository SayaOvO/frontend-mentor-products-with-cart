import { type Product as ProductType } from "../types/product";
import { Product } from "./product";
import * as styles from "./products.module.css";
import useSwr from "swr";

export function ProductsList({ products }: { products: ProductType[] }) {
  return (
    <main className={styles["products-section"]}>
      <h1>Desserts</h1>
      <ul className={styles["products-list"]}>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ul>
    </main>
  );
}
