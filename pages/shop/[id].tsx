import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next";

import Layout from "../../Components/Layout/Layout";
import BreadCrumb from "../../Components/User/ProductPage/BreadCrumb";
import ProductDetails from "../../Components/User/ProductPage/ProductDetails";
import { GetProductDetails, GetProducts } from "../../Utils";
import { IProductDetails } from "../../Interfaces/typings";

const ProductPage = ({ product }: IProductDetails) => {
  return (
    <Layout>
      <main className="py-[3vw]  min-h-[calc(100vh-104px)]">
        <BreadCrumb />
        <ProductDetails product={product} />
      </main>
    </Layout>
  );
};

export default ProductPage;

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const product = await GetProductDetails(params!.id);

  return {
    props: {
      product,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const products = await GetProducts();

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          products.forEach((product: any) => {
            arr.push(`/${locale}/shop/${product._id}`);
          });
          return arr;
        }, [])
      : products.map((product: any) => `/shop/${product._id}`),
    fallback: "blocking",
  };
}
