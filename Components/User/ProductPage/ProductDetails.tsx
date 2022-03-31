import Image from "next/image";
import React, { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { GrSubtract } from "react-icons/gr";
import { motion } from "framer-motion";

import Gallery from "./Gallery";
import { IProductDetails } from "../../../Interfaces/typings";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  ADD_TO_CART,
  INCREASE_PRODUCT_QUANTITY,
} from "../../../Redux/Slices/CartSlice";
import { MdOutlineDone } from "react-icons/md";
import { BsCart, BsHeart } from "react-icons/bs";

const ProductDetails = ({ product }: IProductDetails) => {
  const [isProductBeingAdded, setisProductBeingAdded] = useState(false);
  const [IsProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const [Quantity, setQuantity] = useState<any>(1);
  const [CurrentDisplayImage, setCurrentDisplayImage] = useState<string>("");

  const { _id, description, displayPhoto, name, photos, price } = product;

  const CartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const AddToCart = (e: any) => {
    e.preventDefault();
    setisProductBeingAdded(true);

    if (CartItems.length > 0) {
      const CheckIfProductAlreadyExist = CartItems.filter(
        (item) => item.productId === product._id
      ).length;

      if (CheckIfProductAlreadyExist === 0) {
        dispatch(
          ADD_TO_CART({
            id: product._id,
            name: product.name,
            price: product.price,
            photo: product.displayPhoto?.secure_url,
            quantity: Quantity,
          })
        );
      } else {
        dispatch(
          INCREASE_PRODUCT_QUANTITY({
            id: product._id,
            incrementBy: Quantity,
          })
        );
      }
    } else {
      dispatch(
        ADD_TO_CART({
          id: product._id,
          name: product.name,
          price: product.price,
          photo: product.displayPhoto?.secure_url,
          quantity: Quantity,
        })
      );
    }
    setTimeout(() => {
      setisProductBeingAdded(false);
      setIsProductAddedToCart(true);
    }, 500);
  };

  return (
    <section className="w-full">
      <div className="container flex flex-col xl:flex-row items-start">
        <div className="flex items-start xl:w-2/5 w-full pb-7">
          <Gallery
            product={product}
            setCurrentDisplayImage={setCurrentDisplayImage}
          />
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
            className="relative w-full xl:h-[650px] h-[440px]"
          >
            <Image
              src={
                CurrentDisplayImage
                  ? CurrentDisplayImage
                  : displayPhoto.secure_url
              }
              alt="a"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
        </div>
        <div className="xl:w-3/5 w-full ">
          <div className="xl:pl-[10vw]">
            <motion.h1
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  delay: 0.1,
                },
              }}
              className="xl:text-5xl text-3xl font-bebas xl:mb-10 mb-4"
            >
              {name}
            </motion.h1>
            <div className="flex flex-col">
              <motion.h2
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: 0.2,
                  },
                }}
                className="xl:text-7xl text-5xl font-bebas xl:mb-10 mb-4"
              >
                &#8377; {price}
              </motion.h2>
              <motion.p
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: 0.3,
                  },
                }}
                className=" mt-4 xl:mb-10 mb-6 xl:text-xl text-base"
              >
                {description}
              </motion.p>
              <motion.div
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: 0.4,
                  },
                }}
                className=" flex flex-col"
              >
                <p>Quantity :</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={Quantity}
                    onChange={(e) => {
                      if (Quantity > 1) {
                        setQuantity(e.target.value);
                      }
                    }}
                    className=" outline-none w-40 h-12 border my-2 border-black border-opacity-30 px-4"
                  />
                  <button
                    onClick={() => {
                      if (Quantity > 1) {
                        setQuantity(Quantity - 1);
                      }
                    }}
                    className="border w-12 h-12 flex items-center justify-center border-black border-opacity-30 px-4 active:bg-slate-100"
                  >
                    <GrSubtract />
                  </button>
                  <button
                    onClick={() => setQuantity(Quantity + 1)}
                    className="border w-12 h-12 flex items-center justify-center border-black border-opacity-30 px-4 active:bg-slate-100"
                  >
                    <VscAdd />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className=" my-6 mb-6 flex flex-col-reverse xl:mt-16 xl:flex-row xl:items-center xl:gap-20">
              {IsProductAddedToCart ? (
                <button className="font-bebas text-2xl text-center xl:px-40 py-2 xl:my-20 my-6 w-full xl:w-auto bg-black text-white flex  items-center  justify-center gap-4">
                  <MdOutlineDone className="-ml-1 mr-3 h-5 w-5 text-white" />
                  ADDED TO CART
                </button>
              ) : (
                <>
                  {isProductBeingAdded ? (
                    <button className="font-bebas text-2xl text-center xl:px-40 py-2 xl:my-20 my-6 w-full xl:w-auto bg-black text-white flex  items-center  justify-center gap-4">
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Please Wait
                    </button>
                  ) : (
                    <>
                      <motion.button
                        initial={{
                          y: -10,
                          opacity: 0,
                        }}
                        onClick={AddToCart}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            delay: 0.5,
                          },
                        }}
                        className="font-bebas text-2xl text-center xl:px-40 py-2 xl:my-20 my-6 w-full xl:w-auto bg-black text-white flex  items-center  justify-center gap-4"
                      >
                        <BsCart className="-mt-[3px] text-2xl" />
                        <span>Add to Cart</span>
                      </motion.button>
                    </>
                  )}
                </>
              )}
              <div className="flex  gap-4 xl:gap-0">
                <BsHeart className="text-theme-admin-dark-gray mb-8 cursor-pointer text-2xl hover:scale-105 xl:mb-0" />
                <p className="font-medium uppercase xl:hidden">
                  Add To Wishlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
