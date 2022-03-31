import React from "react";
import { motion } from "framer-motion";
import { BiExport } from "react-icons/bi";
import { BsFilter, BsSearch } from "react-icons/bs";
import { IAdminSearchType } from "../../../Interfaces/typings";

const Search = ({ Placeholder }: IAdminSearchType) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full px-8 py-6 flex items-center"
    >
      <div className=" w-full h-9 flex items-center gap-x-20">
        <div className="flex-1 h-full border border-black border-opacity-20 rounded flex items-center px-3">
          <label htmlFor="search">
            <BsSearch className="text-lg" />
          </label>
          <input
            id="search"
            className="w-full h-full outline-none px-4 placeholder:opacity-60 text-sm"
            placeholder={Placeholder}
          />
        </div>
        <div className="flex items-center h-full gap-x-2">
          <div className=" cursor-pointer border border-black border-opacity-20 rounded h-full flex gap-x-1.5 items-center justify-center px-4 ">
            <BsFilter className="text-xl  opacity-80" />{" "}
            <p className="text-sm tracking-wide  opacity-80 ">Filter</p>
          </div>
          <div className=" cursor-pointer border border-black border-opacity-20 rounded h-full flex gap-x-1.5 items-center justify-center px-2.5 ">
            <BiExport className="text-xl -mt-0.5 opacity-80" />{" "}
            <p className="text-sm tracking-wide  opacity-80 ">Export</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
