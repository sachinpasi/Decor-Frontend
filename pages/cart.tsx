import Link from "next/link";
import React from "react";
import Layout from "../Components/Layout/Layout";
import CartItems from "../Components/User/CartPage/CartItems";
import Heading from "../Components/User/CartPage/Heading";
import { useAppSelector } from "../Redux/hooks";

const Cart = () => {
  const SubTotal = useAppSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  const NoOfItemsInCart = useAppSelector((state) => state.cart.items.length);
  return (
    <Layout>
      <main className="py-[4.15vw] min-h-screen">
        <Heading />
        {NoOfItemsInCart !== 0 ? (
          <>
            <CartItems />
            <div className="mt-7 text-right container">
              <span className="text-xl  font-bebas">Subtotal </span>
              <span className="mx-2">-</span>
              <span className="text-2xl inline-block text-center font-bebas">
                <span className="font-medium">&#8377; </span>{" "}
                {SubTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
              </span>
            </div>
            <div className="text-right container my-10 ">
              <Link href="/checkout">
                <a className="text-base font-medium tracking-wide px-11 py-4 bg-black text-white">
                  {" "}
                  CHECKOUT
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div className="container h-60">
            <p className="text-base tracking-wide">
              You have nothing in your shopping cart.
            </p>
            <div className="block my-10">
              <Link href="/shop">
                <a className="text-base font-medium tracking-wide px-11 py-4 bg-black text-white">
                  {" "}
                  Continue Shopping
                </a>
              </Link>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Cart;
