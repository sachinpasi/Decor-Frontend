import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";

import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";
import CategoryInput from "../../../Components/Admin/AddCategory/CategoryInput";

const AddCategory = () => {
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] h-full ml-auto">
        <Header HeaderData={HeaderData} setActiveCategory={() => {}} />
        <CategoryInput />
      </motion.div>
    </main>
  );
};

export default AddCategory;

const HeaderData = {
  Title: "ADD CATEGORY",
  Button: [],
  Delete: [],
  Links: [
    {
      Title: "Back To Categories",
      Href: "/admin/categories",
      Icon: BiArrowBack,
    },
  ],
};
