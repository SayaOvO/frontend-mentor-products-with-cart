import { useState } from "react";
import { useCartProducts, useResetCart } from "../contexts/cart-context";
import * as styles from "./cart.module.css";
import { ChartRow } from "./chart-row";
import { OrderConfirmedModal } from "./order-confirmed-modal";

export function Cart() {
  const cartProducts = useCartProducts();
  const [open, setOpen] = useState(false);
  const resetCart = useResetCart();
  const productsInCart = cartProducts.filter((product) => product.amount > 0);

  let totalPrice = 0;
  let totalAmount = 0;
  for (const product of productsInCart) {
    totalPrice += product.amount * product.price;
    totalAmount += product.amount;
  }

  const handleCloseModal = () => {
    setOpen(false);
    resetCart();
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <aside className={styles["cart-section"]}>
      <h2 className={styles["cart-title"]}>Your Cart({totalAmount})</h2>
      {totalAmount > 0 ? (
        <ul>
          {productsInCart.map((product) => (
            <ChartRow {...product} key={product.name} />
          ))}
        </ul>
      ) : (
        <img
          src="../../assets/images/illustration-empty-cart.svg"
          alt="empty cart"
          className={styles["empty-cart"]}
        />
      )}
      {totalAmount > 0 ? (
        <>
          <p className={styles["cart-total"]}>
            Order Toal
            <span className={styles["cart-total-money"]}>
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <p className={styles["order-green"]}>
            <img
              src="../../assets/images/icon-carbon-neutral.svg"
              alt="carbon neutral icon"
            />
            This is a carbon-neutral delivery
          </p>
          <button className={styles["confirm-btn"]} onClick={openModal}>
            Confirm Order
          </button>
        </>
      ) : (
        <p className={styles["cart-description"]}>
          Your added items will appear here
        </p>
      )}
      <OrderConfirmedModal
        open={open}
        onCloseModal={handleCloseModal}
        cartProducts={productsInCart}
      />
    </aside>
  );
}
