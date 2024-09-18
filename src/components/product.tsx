import { type Product } from "../types/product";
import { AddToCart } from "./add-to-cart";
import * as styles from "./product.module.css";

interface ProductProps {
  product: Product;
}
export function Product({
  product: { name, image, category, price },
}: ProductProps) {
  return (
    <section>
      <img
        src={image.desktop}
        alt={name}
        className={`${styles["product-image"]} product-image`}
      />
      <AddToCart name={name} />
      <p className={styles["product-category"]}>{category}</p>
      <p className={styles["product-name"]}>{name}</p>
      <p className={styles["product-price"]}>${price}</p>
    </section>
  );
}
