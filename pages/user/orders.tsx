import React from "react";
import Layout from "../../Components/Layout/Layout";
import Sidebar from "../../Components/User/Account/Sidebar/Sidebar";
import { motion } from "framer-motion";
import Header from "../../Components/User/Account/Orders/Header";
import OrderList from "../../Components/User/Account/Orders/OrderList";

const Orders = () => {
  return (
    <Layout>
      <main className="container mx-auto flex flex-col items-start  justify-between xl:flex-row ">
        <Sidebar />
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
          className="min-h-screen w-full xl:w-[calc(100%-15rem)] "
        >
          <Header />
          <OrderList />
        </motion.div>
      </main>
    </Layout>
  );
};

export default Orders;
