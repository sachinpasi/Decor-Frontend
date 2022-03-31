import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { GetUpadtedValues } from "../../../../Utils/GetUpdatedValues";
import FormInput from "../../../Form/FormInput";
import { motion } from "framer-motion";

interface Props {
  UserDetails?: {
    name: string;
    email: string;
    phoneNumber?: number;
    photo: {
      secure_url: string;
    };
  };
  GetReload?: boolean;
  setGetReload: (values: boolean) => void;
}

const DetailsSection = ({ UserDetails, GetReload, setGetReload }: Props) => {
  const initialValues = {
    name: UserDetails?.name || "",
    email: UserDetails?.email || "",
    phoneNumber: UserDetails?.phoneNumber || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const Values = GetUpadtedValues({
        values: values,
        initialValues: initialValues,
      });

      if (Object.keys(Values).length > 0) {
        // UpdateUserDetails(Values).then(() => {
        //   toast.success("Saved Changes Successfully");
        //   setGetReload(!GetReload);
        // });
      }
    },
  });

  return (
    <div className="mx-auto my-2 pb-40 flex  w-[95%] items-center">
      <form onSubmit={formik.handleSubmit} className="w-full">
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
              delay: 0.1,
            },
          }}
          className="flex w-full flex-col items-start border-b py-3 xl:flex-row"
        >
          <div className="w-40 xl:my-2">
            <label className="block text-base  text-gray-700">Name</label>
          </div>
          <div className="w-full max-w-2xl xl:w-[calc(100%-10rem)] xl:px-6">
            <FormInput
              type="text"
              name="name"
              placeholder={"Enter Your Name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
        </motion.div>
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
              delay: 0.2,
            },
          }}
          className="flex w-full flex-col items-start border-b py-3 xl:flex-row"
        >
          <div className="w-40 xl:my-2">
            <label className="block text-base  text-gray-700">
              Phone Number
            </label>
          </div>
          <div className="w-full max-w-2xl xl:w-[calc(100%-10rem)] xl:px-6">
            <FormInput
              type={"text"}
              name="phoneNumber"
              placeholder={"Enter Your Phone Number"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
          </div>
        </motion.div>
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
              delay: 0.3,
            },
          }}
          className="flex w-full flex-col items-start border-b py-3 xl:flex-row"
        >
          <div className="w-40 xl:my-2">
            <label className="block text-base  text-gray-700">
              Email Address
            </label>
          </div>
          <div className="w-full max-w-2xl xl:w-[calc(100%-10rem)] xl:px-6">
            <FormInput
              type={"email"}
              name="email"
              placeholder={"Enter Your Email Address "}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
        </motion.div>

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
          className="flex py-3"
        >
          <div className="my-2 hidden w-40 xl:block"></div>
          <button
            type="submit"
            className=" inline-flex w-full items-center justify-center rounded bg-black px-8 py-2.5 font-medium uppercase tracking-wide text-white xl:mx-6 xl:w-auto xl:text-sm "
          >
            Save Changes
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default DetailsSection;
