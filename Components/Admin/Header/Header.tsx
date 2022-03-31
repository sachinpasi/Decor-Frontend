import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { IAdminHeaderType } from "../../../Interfaces/typings";
import { Admin__DeleteCustomerById } from "../../../Utils";
import { useRouter } from "next/router";

const Header = ({
  HeaderData,
  ActiveCategory,
  setActiveCategory,
}: IAdminHeaderType) => {
  const router = useRouter();
  return (
    <motion.header
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full  px-8 pt-9 "
    >
      <div className="flex justify-between items-center pb-7">
        <h2 className="font-bebas tracking-wide text-3xl">
          {HeaderData.Title}
        </h2>
        <div className="flex items-center gap-x-2">
          {HeaderData?.Links?.map(({ Title, Href, Icon }) => (
            <Link key={Title} href={Href}>
              <a className="border px-8 py-2 rounded cursor-pointer gap-x-3 border-admin-medium-gray border-opacity-70 hover:border-admin-dark-gray opacity-90 hover:opacity-100  bg-black text-white transition-colors flex items-center justify-center">
                {Icon && <Icon />}
                <p className="text-[13px] leading-4 tracking-wider uppercase font-medium">
                  {" "}
                  {Title}
                </p>
              </a>
            </Link>
          ))}
          {HeaderData?.Delete?.map(({ Title, Icon }) => (
            <button
              onClick={() => {
                if (Title === "Delete Account") {
                  Admin__DeleteCustomerById(router.query?.id).then(() =>
                    router.push("/admin/customers")
                  );
                }
              }}
              key={Title}
            >
              <a className="border px-8 py-2 rounded cursor-pointer gap-x-3  opacity-90 hover:opacity-100  bg-red-500 text-white transition-colors flex items-center justify-center">
                {Icon && <Icon />}
                <p className="text-[13px] leading-4 tracking-wider uppercase font-medium">
                  {" "}
                  {Title}
                </p>
              </a>
            </button>
          ))}
        </div>
      </div>
      <div className="flex  items-center border-b border-black border-opacity-20 py-2.5 gap-x-4">
        {HeaderData?.Button?.map(({ Title }) => (
          <button
            className="relative px-1 flex justify-center items-center"
            onClick={() => setActiveCategory(Title)}
            key={Title}
          >
            <p
              className={classNames(
                ActiveCategory === Title ? "font-medium" : "",
                "text-sm  tracking-wide "
              )}
            >
              {Title}
            </p>
            {ActiveCategory === Title && (
              <div className="w-full  top-[29.1px] h-[2.5px] rounded-full bg-black absolute"></div>
            )}
          </button>
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
