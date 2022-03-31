import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  return (
    <div className="w-full h-screen bg-gray-800 px-20 text-white flex flex-col justify-center items-center">
      <motion.div
        initial={{
          scale: 0.7,
        }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className="success-animation"
      >
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </motion.div>
      <motion.h2
        initial={{
          //   y: -10,
          opacity: 0,
        }}
        animate={{
          //   y: 0,
          opacity: 1,
          transition: {
            delay: 1,
          },
        }}
        className="text-center font-bebas text-5xl py-16 tracking-wider"
      >
        Order Placed Successfully
      </motion.h2>
      <Link href="/shop">
        <motion.a
          initial={{
            //   y: -10,
            opacity: 0,
          }}
          animate={{
            //   y: 0,
            opacity: 1,
            transition: {
              delay: 1.5,
            },
          }}
          className="text-lg py-2.5 font-semibold tracking-wider uppercase bg-white text-gray-800 flex justify-center items-center w-72 rounded-md"
        >
          Continue Shopping
        </motion.a>
      </Link>
    </div>
  );
};

export default OrderSuccess;
