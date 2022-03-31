import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ICategory } from "../../../Interfaces/typings";
import { RiEditBoxLine } from "react-icons/ri";
import Link from "next/link";
import { Admin__GetAllCustomers } from "../../../Utils";
import classNames from "classnames";
import Image from "next/image";

const CustomerList = ({ customers }: any) => {
  const [Res, setRes] = useState<any>();

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
    Admin__GetAllCustomers().then(({ data }) => {
      setRes(data);
    });
  }, []);
  return (
    <div className="w-full px-8  flex flex-col py-2">
      {Res && (
        <motion.ul
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={list}
          className="w-full"
        >
          {Res?.users?.map(
            ({ _id, name, photo, role, phoneNumber, email }: any) => (
              <motion.li
                variants={item}
                key={_id}
                className="flex items-center justify-between w-full py-2"
              >
                <div className="flex items-center">
                  <div className="w-14 h-14  relative rounded-full bg-yellow-100">
                    {/* <Image
                      src={photo?.secure_url}
                      objectFit="cover"
                      layout="fill"
                      alt="dp"
                    /> */}
                  </div>
                  <div className="flex flex-col items-start min-w-[400px] px-4">
                    <h4 className="text-sm min-w-[400px]  font-medium tracking-wide uppercase ">
                      {name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  {phoneNumber && (
                    <div className="flex items-center justify-center rounded-full bg-yellow-300 bg-opacity-50 py-[7px] px-3.5">
                      <h6
                        className={classNames(
                          "text-xs font-semibold uppercase tracking-wider text-yellow-800 "
                        )}
                      >
                        {phoneNumber}
                      </h6>
                    </div>
                  )}
                  <div
                    //   onClick={() => {
                    //     setCurrentProductId(product._id);
                    //     setCurrentStockForSelectedProduct(product.stock);
                    //     setisUpadteStockModalOpen(true);
                    //   }}
                    className="flex items-center justify-center rounded-full bg-orange-300 bg-opacity-50 py-[7px] px-3.5"
                  >
                    <h6
                      className={classNames(
                        "text-xs font-semibold uppercase tracking-wider text-orange-800 "
                      )}
                    >
                      {email}
                    </h6>
                  </div>
                  <div
                    className={classNames(
                      role === "admin" ? "bg-violet-300" : "bg-green-300",
                      "flex items-center justify-center rounded-full  bg-opacity-50 py-[7px] px-3.5 min-w-[70px]"
                    )}
                  >
                    <h6
                      className={classNames(
                        role === "admin" ? "text-violet-800" : "text-green-800",
                        "text-xs font-semibold uppercase tracking-wider "
                      )}
                    >
                      {role}
                    </h6>
                  </div>

                  <Link href={`/admin/customers/${_id}`}>
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

export default CustomerList;
