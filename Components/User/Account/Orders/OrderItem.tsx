import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import moment from "moment";

import { OrderItem } from "../../../../Interfaces/typings";

const OrderItem = ({ order }: OrderItem) => {
  const { orderItems, totalAmount, createdAt, orderId, _id } = order;

  return (
    <div className="w-full py-8">
      <motion.div
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            delay: 0.1,
          },
        }}
        className="w-full flex items-center justify-between  pb-3"
      >
        <div className="flex items-center gap-x-8">
          <div className=" flex flex-col gap-y-0.5">
            <h4 className="font-medium text-xs tracking-wide opacity-70">
              Order Number
            </h4>
            <h5 className="font-medium text-sm tracking-wide uppercase ">
              {orderId}
            </h5>
          </div>
          <div className=" flex flex-col gap-y-0.5">
            <h4 className="font-medium text-xs tracking-wide opacity-70">
              Date Placed
            </h4>
            <h5 className="font-medium text-sm tracking-wide ">
              {moment(createdAt).format("ll")}
            </h5>
          </div>
          <div className=" flex flex-col gap-y-0.5">
            <h4 className="font-medium text-xs tracking-wide opacity-70">
              Total Amount
            </h4>
            <h5 className="font-medium text-sm tracking-wide ">
              {" "}
              &#8377;{" "}
              {totalAmount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
            </h5>
          </div>
        </div>
        <Link href={`/user/orders/${_id}`}>
          <a className="px-7 w-[160px] flex items-center justify-center py-2 my-5 bg-indigo-600 rounded-md text-white font-medium tracking-wider text-sm">
            Manage Order
          </a>
        </Link>
      </motion.div>
      <div className="flex flex-col w-full ">
        {orderItems.map(({ name, image, productId, price, quantity }, i) => (
          <motion.div
            initial={{
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: 0.2 * i,
              },
            }}
            key={i}
            className="w-full   flex items-start justify-between border-t "
          >
            <div className="flex items-start gap-x-8 py-5">
              <div className="h-40 w-36 rounded-md bg-slate-100 relative">
                <Image
                  src={image}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <h4 className=" font-bebas tracking-wider text-2xl opacity-90">
                  {name}
                </h4>
                <h5 className="text-[13px] opacity-90">
                  Quantity : <span className="ml-1"> {quantity}</span>
                </h5>
                <h3 className="font-bebas text-xl mt-1 tracking-wider">
                  &#8377;{" "}
                  {price.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
                </h3>
              </div>
            </div>

            <Link href={`/shop/${productId}`}>
              <a className="px-8 w-[160px] flex items-center justify-between py-2 my-5 border border-gray-300 hover:bg-gray-50 transition-colors hover:text-gray-900  rounded-md text-gray-700 font-medium tracking-wider text-sm">
                View Product
              </a>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
