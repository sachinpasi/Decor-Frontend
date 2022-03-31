import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { motion } from "framer-motion";

import Header from "../../Components/Admin/Header/Header";

import Search from "../../Components/Admin/Search/Search";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import ProductList from "../../Components/Admin/List/ProductList";

const ProductsPage = () => {
  const [ActiveCategory, setActiveCategory] = useState("All Products");
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] ml-auto">
        <Header
          HeaderData={HeaderData}
          ActiveCategory={ActiveCategory}
          setActiveCategory={setActiveCategory}
        />
        <Search Placeholder="Search For Products..." />
        <ProductList />
      </motion.div>
    </main>
  );
};

export default ProductsPage;

const HeaderData = {
  Title: "Products",
  Button: [{ Title: "All Products" }],
  Delete: [],
  Links: [
    {
      Title: "ADD PRODUCT",
      Href: "/admin/products/addproduct",
      Icon: AiOutlineAppstoreAdd,
    },
  ],
};
