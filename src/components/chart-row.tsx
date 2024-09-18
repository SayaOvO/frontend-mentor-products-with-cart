import { useClearSameProductsFromCart } from "../contexts/cart-context";
import * as styles from "./chart-row.module.css";

export function ChartRow({
  name,
  amount,
  price,
}: {
  name: string;
  amount: number;
  price: number;
}) {
  const clearSameProductsFromCart = useClearSameProductsFromCart();
  return (
    <li className={styles["container"]}>
      <div>
        <p className={styles["product-name"]}>{name}</p>
        <p>
          <span className={styles["product-amount"]}>{amount}x</span>
          <span className={styles["product-price"]}>@${price}</span>
          <span className={styles["product-total-money"]}>
            ${amount * price}
          </span>
        </p>
      </div>
      <button
        className={styles["remove-icon"]}
        onClick={() => clearSameProductsFromCart(name)}
      >
        <img
          src="../../assets/images/icon-remove-item.svg"
          alt="remove item icon"
        />
      </button>
    </li>
  );
}
