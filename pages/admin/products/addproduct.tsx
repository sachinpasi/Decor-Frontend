import React, { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";
import Search from "../../../Components/Admin/Search/Search";
import ProductInput from "../../../Components/Admin/AddProduct/ProductInput";
import { BiArrowBack } from "react-icons/bi";

const AddProduct = () => {
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] h-full ml-auto">
        <Header HeaderData={HeaderData} setActiveCategory={() => {}} />
        <ProductInput />
      </motion.div>
    </main>
  );
};

export default AddProduct;

const HeaderData = {
  Title: "ADD PRODUCT",
  Button: [],
  Links: [
    {
      Title: "Back To Projects",
      Href: "/admin/products",
      Icon: BiArrowBack,
    },
  ],
};
