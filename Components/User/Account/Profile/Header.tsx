import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="mx-auto flex  w-[95%] items-center">
      <div className="relative h-40 w-40">
        <motion.div
          initial={{
            scale: 0.7,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            scale: 0.8,
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
          className="absolute bottom-1/2 flex h-40 w-40 items-center justify-center rounded-full bg-white shadow xl:bottom-1/4"
        >
          <div className="h-[150px] w-[150px] rounded-full ">
            <Image
              src={
                "https://res.cloudinary.com/dzzvve3hs/image/upload/v1648613782/Decor%20Assets/avtar_inwb5z.svg"
              }
              width={150}
              height={150}
              alt=""
            />
          </div>
        </motion.div>
      </div>

      <div className=" flex h-40 w-[calc(100%-10rem)] items-start justify-between pl-4 xl:py-6 xl:px-6">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold tracking-wide ">Profile</h3>
          <h6 className="text-sm font-normal tracking-wide">
            Update your photo and personal details.
          </h6>
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
};

export default Header;
