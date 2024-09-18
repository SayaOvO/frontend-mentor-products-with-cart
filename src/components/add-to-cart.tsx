import {
  useAddProductToCart,
  useCartProducts,
  useRemoveProductFromCart,
} from "../contexts/cart-context";
import * as styles from "./add-to-cart.module.css";

export function AddToCart({ name }: { name: string }) {
  const cartProducts = useCartProducts();
  const addProductToCart = useAddProductToCart();
  const removeProductFromCart = useRemoveProductFromCart();
  let amount = 0;
  const product = cartProducts.find((product) => product.name === name);

  if (product) {
    amount = product.amount;
  }
  return (
    <>
      {amount > 0 ? (
        <button
          className={`${styles["btn"]} ${styles["change-quantity"]} change-quantity`}
        >
          <span
            className={styles["change-btn"]}
            onClick={() => removeProductFromCart(name)}
          >
            <img
              src="../../assets/images/icon-decrement-quantity.svg"
              alt="decrement quantity svg"
            />
          </span>

          <span className={styles["quantity"]}>{amount}</span>
          <span
            className={styles["change-btn"]}
            onClick={() => addProductToCart(name)}
          >
            <img
              src="../../assets/images/icon-increment-quantity.svg"
              alt="increment quantity svg"
            />
          </span>
        </button>
      ) : (
        <button
          className={`${styles["btn"]} ${styles["add-to-cart"]}`}
          onClick={() => addProductToCart(name)}
        >
          <img
            src="../../assets/images/icon-add-to-cart.svg"
            alt="add to cart icon"
          />
          <span>Add to Cart</span>
        </button>
      )}
    </>
  );
}
