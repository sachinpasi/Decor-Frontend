import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { motion } from "framer-motion";
import {
  Get__Razorpay_Key,
  Initialize_Payement,
  PlaceOrder,
} from "../../../Utils";

import FormInput from "../../Form/FormInput";
import { EMPTY_CART } from "../../../Redux/Slices/CartSlice";

const ShippingInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const Total = useAppSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  const OrderItems = useAppSelector((state) => state.cart.items);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      phoneNo: "",
    },
    onSubmit: ({ address, city, country, phoneNo, postalCode, state }) => {
      const HandlePayment = async () => {
        if (address && city && country && phoneNo && postalCode && state) {
          const res = await initializeRazorpay();

          if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
          }

          await Initialize_Payement({
            amount: Total,
          }).then(({ myOrder }) => {
            Get__Razorpay_Key().then(({ key }) => {
              var options = {
                key: key,
                name: "Decor",
                currency: myOrder?.currency,
                amount: myOrder?.amount,
                order_id: myOrder?.id,
                // image: "https://manuarora.in/logo.png",
                handler: function (response: any) {
                  const data = {
                    shippingInfo: {
                      address,
                      city,
                      country,
                      phoneNo,
                      postalCode,
                      state,
                    },
                    orderItems: OrderItems,
                    paymentInfo: {
                      id: response.razorpay_payment_id,
                    },
                    taxAmount: 0,
                    shippingAmount: 0,
                    totalAmount: Total,
                  };
                  PlaceOrder(data).then(() => {
                    router.push("/checkout/success");
                    dispatch(EMPTY_CART());
                  });
                },
              };
              const paymentObject = new (window as any).Razorpay(options);
              paymentObject.open();
            });
          });
        }
      };
      HandlePayment();
    },
  });

  return (
    <motion.form className="w-2/4" onSubmit={formik.handleSubmit}>
      <motion.div
        exit={{
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        }}
        className=" h-screen px-20 flex flex-col justify-center  py-8"
      >
        <Link href="/">
          <a className="text-4xl font-bebas ">DECOR</a>
        </Link>
        <div className="w-full py-8 border-b">
          <h4 className=" text-lg font-semibold tracking-wide uppercase my-4">
            Shipping Address
          </h4>
          <FormInput
            label="Address"
            type="text"
            name="address"
            placeholder="House No / Locality"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            errorMessage={formik.errors.address}
          />
          <div className="flex items-center gap-x-8">
            <FormInput
              type="text"
              label="City"
              name="city"
              placeholder="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              errorMessage={formik.errors.city}
            />
            <FormInput
              type="text"
              label="State"
              name="state"
              placeholder="State"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              errorMessage={formik.errors.state}
            />
          </div>
          <FormInput
            type="text"
            label="Country"
            name="country"
            placeholder="Country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            errorMessage={formik.errors.country}
          />
          <div className="flex items-center gap-x-8">
            <FormInput
              type="number"
              label="Pin Code"
              name="postalCode"
              placeholder="Pin Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalCode}
              errorMessage={formik.errors.postalCode}
            />
            <FormInput
              type="number"
              label="Phone Number"
              name="phoneNo"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
              errorMessage={formik.errors.phoneNo}
            />
          </div>
        </div>
        <div className="py-4 flex justify-end">
          <button
            // onClick={makePayment}
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white font-medium tracking-wide rounded-md"
          >
            Pay Now
          </button>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default ShippingInfo;
