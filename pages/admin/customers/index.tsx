import React, { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";
import Search from "../../../Components/Admin/Search/Search";
import CustomerList from "../../../Components/Admin/List/CustomerList";

const Customers = () => {
  const [ActiveCategory, setActiveCategory] = useState("All Customers");

  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] ml-auto">
        <Header
          HeaderData={HeaderData}
          ActiveCategory={ActiveCategory}
          setActiveCategory={setActiveCategory}
        />
        <Search Placeholder="Search For Customers..." />
        <CustomerList />
      </motion.div>
    </main>
  );
};

export default Customers;

const HeaderData = {
  Title: "Customers",
  Button: [{ Title: "All Customers" }],
  Links: [
    // {
    //   Title: "ADD CATEGORY",
    //   Href: "/admin/categories/addcategory",
    //   // Icon: AiOutlineAppstoreAdd,
    // },
  ],
  Delete: [],
};
