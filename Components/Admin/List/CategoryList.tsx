import React, { useState } from "react";
import { motion } from "framer-motion";
import { ICategory } from "../../../Interfaces/typings";
import { RiEditBoxLine } from "react-icons/ri";
import Link from "next/link";

const CategoryList = ({ categories }: ICategory) => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: { opacity: 0, y: -50 },
  };

  return (
    <div className="w-full px-8  flex flex-col py-2">
      {categories && (
        <motion.ul
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={list}
          className="w-full"
        >
          {categories?.map(({ _id, name, productCount }: any) => (
            <motion.li
              variants={item}
              key={_id}
              className="flex items-center justify-between w-full py-2"
            >
              <div className="flex items-center">
                <div className="w-14 h-14  relative rounded-full bg-yellow-100"></div>
                <div className="flex flex-col items-start min-w-[400px] px-4">
                  <h4 className="text-sm min-w-[400px]  font-medium tracking-wide ">
                    {name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center rounded-full bg-yellow-300 bg-opacity-50 py-[7px] px-3.5"></div>
                <div className="flex items-center justify-center rounded-full bg-green-300 bg-opacity-50 py-[7px] px-3.5">
                  <h6 className="text-xs font-semibold uppercase tracking-wider text-green-800">
                    <span className="text-xs">{productCount}</span> - Products
                  </h6>
                </div>
                <div
                  //   onClick={() => {
                  //     setCurrentProductId(product._id);
                  //     setCurrentStockForSelectedProduct(product.stock);
                  //     setisUpadteStockModalOpen(true);
                  //   }}
                  className="flex items-center justify-center rounded-full bg-orange-300 bg-opacity-50 py-[7px] px-3.5"
                ></div>
                <Link href={`/admin/products/${_id}`}>
                  <a>
                    <RiEditBoxLine className="text-xl text-admin-dark-gray " />
                  </a>
                </Link>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default CategoryList;
