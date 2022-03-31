import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Search from "../../../Components/Admin/Search/Search";
import CategoryList from "../../../Components/Admin/List/CategoryList";
import { GetCategories } from "../../../Utils";

const Categories = () => {
  const [ActiveCategory, setActiveCategory] = useState("All Categories");
  const [Res, setRes] = useState<any>();

  useEffect(() => {
    GetCategories().then((res) => {
      setRes(res);
    });
  }, []);
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] ml-auto">
        <Header
          HeaderData={HeaderData}
          ActiveCategory={ActiveCategory}
          setActiveCategory={setActiveCategory}
        />
        <Search Placeholder="Search For Categories..." />
        <CategoryList categories={Res} />
      </motion.div>
    </main>
  );
};

export default Categories;

const HeaderData = {
  Title: "CATEGORIES",
  Button: [{ Title: "All Categories" }],
  Links: [
    {
      Title: "ADD CATEGORY",
      Href: "/admin/categories/addcategory",
      Icon: AiOutlineAppstoreAdd,
    },
  ],
};
