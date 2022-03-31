import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiCategory, BiHome, BiPurchaseTag } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaBoxes } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { IAdminSidebarItem } from "../../../Interfaces/typings";
import { useRouter } from "next/router";
import classNames from "classnames";
import { LOGOUT } from "../../../Redux/Slices/UserSlice";
import { useAppDispatch } from "../../../Redux/hooks";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <motion.aside className="w-60 h-screen border-r border-admin-light-gray border-opacity-70 p-9 fixed bg-white ">
      <div className=" w-full h-full flex flex-col items-start ">
        <Link href="/">
          <a className="text-5xl font-bebas w-full text-center ">DECOR</a>
        </Link>
        <div className="flex flex-col justify-between h-full items-start pt-14 gap-y-3 -ml-3.5">
          <div className="flex flex-col items-start  gap-y-3">
            <SidebarItems
              href="/admin/dashboard"
              title="Dashboard"
              Icon={BiHome}
            />
            <SidebarItems
              href="/admin/categories"
              title="Categories"
              Icon={BiCategory}
            />
            <SidebarItems
              href="/admin/products"
              title="Products"
              Icon={FaBoxes}
            />
            <SidebarItems
              href="/admin/orders"
              title="Orders"
              Icon={BiPurchaseTag}
            />
            <SidebarItems
              href="/admin/customers"
              title="Customers"
              Icon={HiOutlineUsers}
            />
            <SidebarItems
              onClick={() => {
                dispatch(LOGOUT());
                router.push("/auth/login");
              }}
              title="Log Out"
              Icon={RiLogoutCircleRLine}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-center w-full space-x-2">
              <div className="w-12 h-12 bg-amber-200 rounded-full"></div>
              <div className=" flex flex-col justify-center items-start">
                <h5 className="font-bebas tracking-wider text-lg leading-6">
                  Sachin Pasi
                </h5>
                <p className="text-xs leading-3 ">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

const SidebarItems = ({ href, title, Icon, onClick }: IAdminSidebarItem) => {
  const router = useRouter();
  if (!href && onClick) {
    return (
      <button onClick={onClick}>
        <a
          className={classNames(
            router.pathname.includes(href) &&
              "font-medium bg-admin-extra-light-gray px-6 rounded-full py-1.5",
            "flex items-center gap-x-3 text-base px-6 py-1.5"
          )}
        >
          <Icon className="text-2xl" />
          {title}
        </a>
      </button>
    );
  } else {
    return (
      <Link href={href}>
        <a
          className={classNames(
            router.pathname.includes(href) &&
              "font-medium bg-admin-extra-light-gray px-6 rounded-full py-1.5",
            "flex items-center gap-x-3 text-base px-6 py-1.5"
          )}
        >
          <Icon className="text-2xl" />
          {title}
        </a>
      </Link>
    );
  }
};
