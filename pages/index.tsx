import React from "react";
import { motion } from "framer-motion";

import Layout from "../Components/Layout/Layout";
import Category from "../Components/User/HomePage/Category/Category";
import Header from "../Components/User/HomePage/Header/Header";
import { easing } from "../Components/Animation/easing";
import { useAppSelector } from "../Redux/hooks";

const Index = ({ isFirstMount }: any) => {
  const User = useAppSelector((state) => state.user);

  return (
    <Layout>
      <motion.div
        key="HomePage"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: easing,
          },
        }}
      >
        <Header isFirstMount={isFirstMount} />
        <Category />
      </motion.div>
    </Layout>
  );
};

export default Index;
