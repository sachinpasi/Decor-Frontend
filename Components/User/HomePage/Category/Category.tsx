import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Category = () => {
  const V1 = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hidden: { opacity: 0, scale: 0.7 },
  };

  const V2 = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.5 },
    },
    hidden: { opacity: 0, scale: 0.7 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <section className="w-full py-16">
      <div className="container">
        <h3 className="whitespace-pre-wrap text-5xl font-bebas text-center">
          Shop by Category
        </h3>
        <div className="w-full flex flex-col xl:flex-row items-start justify-between">
          <div className="xl:w-2/4 w-full flex flex-col items-center py-8">
            <div className="w-full h-96  xl:w-[500px] xl:h-[450px] my-12 ">
              <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                exit="hidden"
                variants={V1}
                className="relative w-full h-full"
              >
                <Image
                  src="https://res.cloudinary.com/dzzvve3hs/image/upload/v1647056703/Decor%20Assets/chair_hon87v.jpg"
                  alt="chair"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
            <div className="w-full xl:w-auto">
              <h4 className="xl:w-[500px] text-4xl font-bebas mb-4">Seating</h4>
              <Link href="/shop?category=seating&categoryId=623feaece1af69e012e43c88">
                <a className="text-xl border-b py-1.5 border-black">
                  Shop Seating
                </a>
              </Link>
            </div>
          </div>{" "}
          <div className="xl:w-2/4 w-full flex flex-col items-center py-8">
            <div className=" w-full h-96 xl:w-[500px] xl:h-[700px] my-12 ">
              <motion.div
                ref={ref}
                animate={controls}
                exit="hidden"
                initial="hidden"
                variants={V2}
                className="relative w-full h-full"
              >
                <Image
                  src="https://res.cloudinary.com/dzzvve3hs/image/upload/v1647057537/Decor%20Assets/table_udzxp1.jpg"
                  alt="chair"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
            <div className="w-full xl:w-auto">
              <h4 className="xl:w-[500px] text-4xl font-bebas mb-4">TABLE</h4>
              <Link href="/shop?category=table&categoryId=623fea1ee1af69e012e43c83">
                <a className="text-xl border-b py-1.5 border-black">
                  Shop Table
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
