import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout/Layout";
import Sidebar from "../../../Components/User/Account/Sidebar/Sidebar";
import { OrderItem } from "../../../Interfaces/typings";
import { GetOrderDetails } from "../../../Utils";
import { motion } from "framer-motion";
import Link from "next/link";

const OrderDetails = () => {
  const [Data, setData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (router.query?.id) {
      GetOrderDetails(router.query?.id).then((order) => {
        setData(order);
      });
    }
  }, [router.query?.id]);

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
          <div className="w-full">
            <h1 className="text-4xl font-bebas tracking-wide">Order Details</h1>
            <div className="w-full flex items-center py-2 pb-4 border-b border-gray-300">
              <h5 className="font-medium text-sm tracking-wide ">
                {moment(Data?.createdAt).format("ll")}
              </h5>
            </div>
            <div className="py-6 pb-4 border-b border-gray-300">
              {Data?.orderItems?.map(
                ({ name, productId, image, quantity, price }: any) => (
                  <div
                    key={productId}
                    className="w-full flex justify-between items-start py-4"
                  >
                    <div className="flex items-start gap-x-8">
                      <div className="w-28 h-28 relative  ">
                        <Image
                          src={image}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>

                      <div className="flex flex-col">
                        <h4 className=" font-bebas tracking-wider text-2xl opacity-90">
                          {name}
                        </h4>
                        <h5 className="text-[13px] opacity-90">
                          Quantity : <span className="ml-1"> {quantity}</span>
                        </h5>
                        <h3 className="font-bebas text-xl mt-1 tracking-wider">
                          &#8377;{" "}
                          {price
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
                        </h3>
                      </div>
                    </div>
                    <Link href={`/shop/${productId}`}>
                      <a className="px-8 w-[160px] flex items-center justify-between py-2 my-5 border border-gray-300 hover:bg-gray-50 transition-colors hover:text-gray-900  rounded-md text-gray-700 font-medium tracking-wider text-sm">
                        View Product
                      </a>
                    </Link>
                  </div>
                )
              )}
            </div>
            <div className="py-6 flex w-full items-start b-4 border-b border-gray-300">
              <div className="w-2/4 ">
                <h3 className="font-medium tracking-wide">Shipping Address</h3>
                <div className="py-4 text-gray-800 capitalize text-sm tracking-wide">
                  <p className="tracking-wide">{Data?.shippingInfo.address},</p>
                  <div className="flex items-center gap-x-1">
                    <p className="tracking-wide">{Data?.shippingInfo.city},</p>
                    <p className="tracking-wide">{Data?.shippingInfo.state},</p>
                  </div>

                  <p>{Data?.shippingInfo.country},</p>
                  <p>{Data?.shippingInfo.postalCode}</p>
                </div>
              </div>{" "}
            </div>

            <div className="w-full flex flex-col gap-y-2  border-b py-4 border-gray-400 ">
              <div className="w-full flex justify-between">
                <h6 className="text-black tracking-wider uppercase text-sm">
                  Subtotal
                </h6>
                <h5 className="font-bebas tracking-wide text-lg">
                  {" "}
                  &#8377;{" "}
                  {Data?.totalAmount
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
                </h5>
              </div>
              <div className="w-full flex justify-between">
                <h6 className="text-black tracking-wider uppercase text-sm">
                  Shipping Charge
                </h6>
                <h5 className="font-bebas tracking-wide text-lg"> Free</h5>
              </div>
            </div>

            <div className="w-full flex justify-between py-4  pb-40">
              <h6 className="text-black tracking-wider uppercase ">TOTAL</h6>
              <h5 className="font-bebas tracking-wide text-2xl">
                {" "}
                &#8377;{" "}
                {Data?.totalAmount
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
              </h5>
            </div>
          </div>
        </motion.div>
      </main>
    </Layout>
  );
};

export default OrderDetails;
