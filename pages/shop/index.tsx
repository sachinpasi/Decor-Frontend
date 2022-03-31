import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { motion } from "framer-motion";
import { easing } from "../../Components/Animation/easing";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/User/ShopPage/Header";
import Category from "../../Components/User/ShopPage/Category";
import ProductList from "../../Components/User/ShopPage/ProductList";
import { GetCategories, GetProducts } from "../../Utils";
import { IShop } from "../../Interfaces/typings";

const Index = ({ products, categories }: IShop) => {
  return (
    <Layout>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            ease: easing,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
            ease: easing,
          },
        }}
      >
        <Header />
        <div className="container min-h-screen flex flex-col xl:flex-row items-start justify-between border-t py-8 border-black  border-opacity-20">
          <Category categories={categories} />
          <ProductList products={products} />
        </div>
      </motion.div>
    </Layout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const categories = await GetCategories();
  const products = await GetProducts();

  return {
    props: {
      products,
      categories,
    },
    revalidate: 60,
  };
}

export default Index;
