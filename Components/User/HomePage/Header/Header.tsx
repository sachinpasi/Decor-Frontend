import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import { motion } from "framer-motion";
import classNames from "classnames";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

const Header = ({ isFirstMount }: any) => {
  return (
    <section>
      <div className="container max-h-screen h-[calc(100vh-100px)] flex relative">
        <div className="w-1/4 relative hidden xl:block">
          <motion.div
            initial={{ scale: 0.95, y: "-50%", opacity: 0 }}
            animate={{
              scale: 1,
              y: "-50%",
              opacity: 1,
              transition: { delay: isFirstMount ? 0.7 : 0.5 },
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
              transition: { delay: 0.3 },
            }}
            className="w-[600px] h-96  absolute z-30 top-2/4 -translate-y-2/4 frosted flex flex-col justify-center "
          >
            <motion.ul className="grid grid-cols-10  gap-4  absolute -top-[80px] left-10">
              {Array(100)
                .fill(1)
                .map((_, i) => (
                  <motion.li
                    key={i}
                    className={classNames("w-1 h-1 bg-teal-900 rounded-full")}
                  ></motion.li>
                ))}
            </motion.ul>
            <motion.h2 className="text-8xl font-bebas text-teal-900 pt-20">
              WE HELP YOU MAKE MODERN INTERIOR
            </motion.h2>
          </motion.div>
        </div>
        <div className="xl:hidden w-full h-full flex-col absolute z-10  bg-white bg-opacity-50 flex justify-center items-start ">
          <motion.h2 className="text-7xl font-bebas  ">
            WE HELP YOU MAKE MODERN INTERIOR
          </motion.h2>
          <button className="bg-black text-white font-bebas tracking-wide px-12 py-2 text-3xl my-12">
            SHOP NOW
          </button>
        </div>
        <div className="xl:w-3/4 w-full hidden xl:block">
          <Swiper
            direction="vertical"
            slidesPerView={1}
            loop={true}
            autoplay
            effect="fade"
            navigation={true}
            modules={[Navigation, EffectFade]}
          >
            <SwiperSlide>
              <div className="w-full h-[calc(100vh-100px)] flex justify-end">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: isFirstMount ? 0.5 : 0.3,
                    },
                  }}
                  exit={{
                    scale: 1,
                    opacity: 0,
                    transition: {
                      delay: 0.5,
                    },
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="https://res.cloudinary.com/dzzvve3hs/image/upload/v1647151105/Decor%20Assets/slava-keyzman-sPossnuLEBU-unsplash_olaxz9.jpg"
                    alt=""
                    priority
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[calc(100vh-100px)] flex justify-end">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ delay: isFirstMount ? 0.8 : 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src="https://res.cloudinary.com/dzzvve3hs/image/upload/v1647151495/Decor%20Assets/francesca-tosolini-DmOhItSo49k-unsplash_vd1fqq.jpg"
                    alt=""
                    priority
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Header;
