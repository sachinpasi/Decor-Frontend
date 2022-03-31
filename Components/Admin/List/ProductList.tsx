import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { Admin__GetAllProducts } from "../../../Utils";
import Image from "next/image";
import StockUpdate from "../Modals/StockUpdate";

const ProductList = () => {
  const [Res, setRes] = useState<any>();
  const [isStockOpen, setisStockOpen] = useState("");
  const [GetReload, setGetReload] = useState(false);

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

  useEffect(() => {
    Admin__GetAllProducts().then(({ data }) => {
      setRes(data);
    });
  }, [GetReload]);
  return (
    <div className="w-full px-8  flex flex-col py-2">
      <StockUpdate
        GetReload={GetReload}
        setGetReload={setGetReload}
        isStockOpen={isStockOpen}
        setisStockOpen={setisStockOpen}
      />
      {Res && (
        <motion.ul
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={list}
          className="w-full"
        >
          {Res?.products?.map(
            ({
              name,
              category,
              _id,
              price,
              stock,
              sold,
              displayPhoto,
            }: any) => (
              <motion.li
                variants={item}
                key={_id}
                className="flex items-center justify-between w-full py-2"
              >
                <div className="flex items-center">
                  <div className="w-14 h-16 relative bg-slate-500">
                    <Image
                      src={displayPhoto.secure_url}
                      objectFit="cover"
                      layout="fill"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start min-w-[400px] px-4">
                    <h4 className="text-sm min-w-[400px]  font-medium tracking-wide ">
                      {name}
                    </h4>
                    <p className="text-xs tracking-wide">{category.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="flex items-center justify-center rounded-full bg-yellow-300 bg-opacity-50 py-[7px] px-3.5">
                    <h6 className="text-xs font-semibold uppercase tracking-wider text-yellow-800">
                      &#8377; {price}
                    </h6>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-green-300 bg-opacity-50 py-[7px] px-3.5">
                    <h6 className="text-xs font-semibold uppercase tracking-wider text-green-800">
                      <span className="text-xs">{sold}</span> - SOLD
                    </h6>
                  </div>
                  <button
                    onClick={() => {
                      // setCurrentProductId(product._id);
                      // setCurrentStockForSelectedProduct(product.stock);
                      setisStockOpen(_id);
                    }}
                    className="flex items-center justify-center rounded-full bg-orange-300 bg-opacity-50 py-[7px] px-3.5"
                  >
                    <h6 className="text-xs font-semibold uppercase tracking-wider text-orange-800">
                      <span className="text-xs">{stock}</span> - remaining
                    </h6>
                  </button>
                  <Link href={`/admin/products/${_id}`}>
                    <a>
                      <RiEditBoxLine className="text-xl text-admin-dark-gray " />
                    </a>
                  </Link>
                </div>
              </motion.li>
            )
          )}
        </motion.ul>
      )}
    </div>
  );
};

export default ProductList;
