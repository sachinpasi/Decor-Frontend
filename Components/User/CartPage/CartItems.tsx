import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrSubtract } from "react-icons/gr";
import { VscAdd } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART,
} from "../../../Redux/Slices/CartSlice";

const CartItems = () => {
  const CartProducts = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const IncresesQuantity = (id: string) => {
    dispatch(
      INCREASE_PRODUCT_QUANTITY({
        id: id,
        incrementBy: 1,
      })
    );
  };
  const DecreaseQuantity = (id: string) => {
    dispatch(
      DECREASE_PRODUCT_QUANTITY({
        id: id,
      })
    );
  };

  const RemoveItemFromCart = (id: string) => {
    dispatch(
      REMOVE_FROM_CART({
        id: id,
      })
    );
  };

  return (
    <section className="w-full">
      <div className="container">
        <div className="flex w-full items-center justify-start pb-3 border-b border-black border-opacity-20 ">
          <div className="inline-block align-middle xl:mr-[1.8em] mr-3 text-xl cursor-pointer invisible">
            <button className="bg-transparent border-none outline-none opacity-70">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <span className="inline-block align-middle uppercase text-xs tracking-wider opacity-70">
            <span>Product</span>
          </span>
          <div className="inline-block align-middle w-24 relative mr-8"></div>
          <div className="inline-block align-middle flex-grow-[8]"></div>
          <div className="hidden xl:inline-block align-middle whitespace-nowrap xl:min-w-[272px] text-center ">
            <span className="inline-block align-middle uppercase text-xs tracking-wider opacity-70">
              <span>QUANTITY</span>
            </span>
          </div>
          <div className="inline-block align-middle whitespace-nowrap min-w-[20vw] text-right ">
            <span className="inline-block align-middle uppercase text-xs tracking-wider opacity-70">
              <span>PRICE</span>
            </span>
          </div>
        </div>
        {CartProducts?.map(
          ({ category, image, name, price, productId, quantity }) => (
            <div
              key={productId}
              className="flex w-full items-center justify-start py-5 min-h-[70px] border-b border-black border-opacity-20 "
            >
              <div className="inline-block align-middle xl:mr-[1.8em] mr-3 text-xl cursor-pointer">
                <button
                  onClick={() => RemoveItemFromCart(productId)}
                  className="bg-transparent border-none outline-none opacity-70"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="xl:w-16 xl:h-24 w-10 h-16 relative inline-block align-middle  xl:mr-7 mr-3">
                <Image src={image} alt="a" layout="fill" objectFit="cover" />
              </div>
              <div className="inline-block align-middle text-sm flex-grow-[8] xl:mr-7 mr-3">
                <Link href={`/shop/${productId}`}>
                  <a className="xl:text-lg text-sm break-words">{name}</a>
                </Link>
                <div className=" xl:hidden flex items-center gap-2">
                  <button
                    onClick={() => {
                      quantity > 1 && DecreaseQuantity(productId);
                    }}
                    className="border w-8 h-8  flex items-center justify-center border-black border-opacity-30  active:bg-slate-100"
                  >
                    <GrSubtract />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={() => {}}
                    className=" outline-none w-9 h-9  border my-2 border-black border-opacity-30  text-center"
                  />
                  <button
                    onClick={() => IncresesQuantity(productId)}
                    className="border w-8 h-8  flex items-center justify-center border-black border-opacity-30  active:bg-slate-100"
                  >
                    <VscAdd />
                  </button>
                </div>
              </div>
              <div className="hidden xl:flex items-center gap-2">
                <button
                  onClick={() => {
                    quantity > 1 && DecreaseQuantity(productId);
                  }}
                  className="border w-12 h-12 flex items-center justify-center border-black border-opacity-30 px-4 active:bg-slate-100"
                >
                  <GrSubtract />
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={() => {}}
                  className=" outline-none w-40 h-12 border my-2 border-black border-opacity-30 px-4 text-center"
                />
                <button
                  onClick={() => IncresesQuantity(productId)}
                  className="border w-12 h-12 flex items-center justify-center border-black border-opacity-30 px-4 active:bg-slate-100"
                >
                  <VscAdd />
                </button>
              </div>
              <div className="inline-block align-middle xl:text-base text-sm whitespace-nowrap text-right min-w-[20vw]">
                &#8377;{" "}
                {price.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default CartItems;
