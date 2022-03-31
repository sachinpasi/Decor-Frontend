import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { motion } from "framer-motion";

const Summary = () => {
  const CartProducts = useAppSelector((state) => state.cart.items);
  const SubTotal = useAppSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  return (
    <motion.div className="w-2/4 h-screen bg-gray-800 px-20 text-white flex flex-col justify-center">
      <h6 className="tracking-wide">Amount</h6>
      <h3 className="font-bebas text-4xl tracking-wide py-2">
        &#8377; {SubTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
      </h3>
      <div className=" flex flex-col ">
        {CartProducts?.map(({ image, name, price, productId, quantity }) => (
          <div
            key={productId}
            className=" flex items-start justify-between border-b border-gray-400 py-5 "
          >
            <div className="flex items-start gap-x-4">
              <div className="w-20 h-20 bg-slate-100 rounded-md relative">
                <Image
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-y-2 py-2">
                <h6 className="text-sm tracking-wider">{name}</h6>
                <div className="flex items-center gap-x-2 text-xs">
                  <p className="text-xs tracking-wider">Quantity :</p>
                  <p>{quantity}</p>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bebas tracking-wide py-2">
              &#8377; {price.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
            </h3>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-y-2  border-b py-4 border-gray-400">
        <div className="w-full flex justify-between">
          <h6 className="text-gray-200 tracking-wider uppercase text-sm">
            Subtotal
          </h6>
          <h5 className="font-bebas tracking-wide text-lg">
            {" "}
            &#8377;{" "}
            {SubTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
          </h5>
        </div>
        <div className="w-full flex justify-between">
          <h6 className="text-gray-200 tracking-wider uppercase text-sm">
            Shipping Charge
          </h6>
          <h5 className="font-bebas tracking-wide text-lg"> Free</h5>
        </div>
      </div>

      <div className="w-full flex justify-between py-4">
        <h6 className="text-gray-200 tracking-wider uppercase ">TOTAL</h6>
        <h5 className="font-bebas tracking-wide text-2xl">
          {" "}
          &#8377; {SubTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
        </h5>
      </div>
    </motion.div>
  );
};

export default Summary;
