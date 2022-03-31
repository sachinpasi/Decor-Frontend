import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

const BreadCrumb = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.1,
        },
      }}
      className="xl:pb-16 pb-5 w-full"
    >
      <div className="container flex space-x-2 items-center">
        <Link href="/shop">
          <a className="text-lg">Shop</a>
        </Link>
        <BsChevronRight />
        <Link href="/shop/123456789">
          <a className="text-lg">Boulevard Table</a>
        </Link>
      </div>
    </motion.section>
  );
};

export default BreadCrumb;
