import { CartProduct } from "../contexts/cart-context";
import * as styles from "./order-confirmed-modal.module.css";
import * as cartRowStyles from "./chart-row.module.css";

import { createPortal } from "react-dom";

export function OrderConfirmedModal({
  cartProducts,
  open,
  onCloseModal,
}: {
  cartProducts: CartProduct[];
  open: boolean;
  onCloseModal: () => void;
}) {
  const total = cartProducts.reduce(
    (acc, curr) => acc + curr.amount * curr.price,
    0
  );
  return createPortal(
    <div className={`${styles["modal-overlay"]} ${open && styles["open"]}`}>
      <div className={styles["modal-content"]}>
        <img
          src="../../assets/images/icon-order-confirmed.svg"
          alt="confirm order icon"
        />
        <h2 className={styles["title"]}>Order Confirmed!</h2>
        <p className={styles["description"]}>We hope you enjoy your food!</p>
        <ul className={styles["product-list"]}>
          {cartProducts.map((product) => (
            <li key={product.name} className={styles["product"]}>
              <img
                src={product.image}
                alt={product.name}
                className={styles["product-image"]}
              />
              <div>
                <p className={cartRowStyles["product-name"]}>{product.name}</p>
                <p>
                  <span className={cartRowStyles["product-amount"]}>
                    {product.amount}x
                  </span>
                  <span className={cartRowStyles["product-price"]}>
                    @${product.price}
                  </span>
                </p>
              </div>
              <span className={cartRowStyles["product-total-money"]}>
                ${(product.amount * product.price).toFixed(2)}
              </span>
            </li>
          ))}

          <p className={styles["total"]}>
            Order Total
            <span className={styles["total-money"]}>${total.toFixed(2)}</span>
          </p>
        </ul>
        <button onClick={onCloseModal} className={styles["new-order-btn"]}>
          Start New Order
        </button>
      </div>
    </div>,
    document.getElementById("app")!
  );
}
