import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IProductDetails } from "../../../Interfaces/typings";

interface Type {
  product: {
    name: string;
    price: number;
    description: string;
    displayPhoto: {
      secure_url: string;
    };
    photos: {
      secure_url: string;
    }[];
    _id: string;
  };
  setCurrentDisplayImage: (value: string) => void;
}

const Gallery = ({ product, setCurrentDisplayImage }: Type) => {
  return (
    <div className=" hidden xl:flex items-start overflow-hidden select-none">
      <div className="mr-6 grid gap-y-1.5 ">
        {product.photos?.map(({ secure_url }, i) => (
          <motion.button
            onClick={() => setCurrentDisplayImage(secure_url)}
            key={i}
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: 0.2,
              },
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            }}
            className="relative h-20 w-14"
          >
            <Image src={secure_url} alt="a" layout="fill" objectFit="cover" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
