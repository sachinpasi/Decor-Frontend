import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import { IProductList } from "../../../Interfaces/typings";
import { useRouter } from "next/router";
import useAxios from "../../../Hooks/useAxios";

const ProductList = ({ products }: IProductList) => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.3,
      },
    },
    hidden: { opacity: 0, scale: 0.7 },
  };

  const router = useRouter();
  const Id = router.query?.categoryId;

  const { loading, response, error, Run } = useAxios({
    axiosParams: {
      method: "GET",
      url: "/product/getAllProducts",
      params: {
        category: router.query?.categoryId,
      },
    },
  });

  useEffect(() => {
    if (router.query?.category) {
      Run();
    }
  }, [router.query]);

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={list}
      className="xl:w-[calc(100%-20rem)] w-full grid xl:grid-cols-2 xl:gap-[4vw] gap-y-12  "
    >
      {response && router.asPath !== "/shop" ? (
        <>
          {response?.products?.map(
            ({ _id, name, displayPhoto, price }: any, index: number) => (
              <motion.li key={_id} variants={item}>
                <Link passHref href={`/shop/${_id}`}>
                  <motion.a className="w-full h-full ">
                    <div className="relative xl:w-[537px] xl:h-[700px] w-full h-[450px] bg-slate-400 cursor-pointer">
                      <Image
                        src={displayPhoto.secure_url}
                        alt="a"
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="xl:mt-[1.5vw] mt-[5vw]  flex flex-col w-full justify-between cursor-pointer">
                      <h4 className="xl:text-7xl text-5xl  font-bebas">
                        {name}
                      </h4>
                      <p className="mt-2">&#8377; {price} </p>
                    </div>
                  </motion.a>
                </Link>
              </motion.li>
            )
          )}
        </>
      ) : (
        <>
          {products.map(({ _id, name, displayPhoto, price }) => (
            <motion.li key={_id} variants={item}>
              <Link passHref href={`/shop/${_id}`}>
                <motion.a className="w-full h-full ">
                  <div className="relative xl:w-[537px] xl:h-[700px] w-full h-[450px] bg-slate-400 cursor-pointer">
                    <Image
                      src={displayPhoto.secure_url}
                      alt="a"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="xl:mt-[1.5vw] mt-[5vw]  flex flex-col w-full justify-between cursor-pointer">
                    <h4 className="xl:text-7xl text-5xl  font-bebas">{name}</h4>
                    <p className="mt-2">&#8377; {price} </p>
                  </div>
                </motion.a>
              </Link>
            </motion.li>
          ))}
        </>
      )}
    </motion.ul>
  );
};

export default ProductList;
