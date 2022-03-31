import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

import FormInput from "../../Components/Form/FormInput";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { SignUp } from "../../Utils";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: ({ email, password, name }) => {
      SignUp({
        email,
        password,
        name,
      })
        .then(({ data }) => {
          toast.success("Sign Up Successfull");
          setTimeout(() => {
            router.push("/auth/login");
          }, 500);
        })
        .catch();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
      name: yup.string().required("Name is required"),
    }),
  });

  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
      className="w-full h-screen flex items-start overflow-x-hidden"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 1,
            ease: "easeInOut",
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut",
          },
        }}
        className="xl:w-2/4 h-full flex flex-col  "
      >
        <div className="h-full w-[85%] mx-auto relative">
          <div className="xl:absolute xl:top-4 pt-4 xl:pt-0">
            <Link href="/">
              <a className="text-4xl font-bebas ">DECOR</a>
            </Link>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 h-full xl:h-auto">
              <h3 className="text-3xl font-bebas py-2">Sign up</h3>
              <p className="text-gray-500 tracking-wide">Create Account</p>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-8 "
              >
                <FormInput
                  type="text"
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.name}
                />
                <FormInput
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.email}
                />
                <FormInput
                  type="password"
                  label="password"
                  name="password"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.password}
                />

                <button
                  type="submit"
                  className="w-full h-11 bg-black text-white rounded-md my-2 mt-6"
                >
                  Create Account
                </button>
                <button className="w-full h-11 border border-gray-300  rounded-md my-2 flex items-center justify-center space-x-2">
                  <FcGoogle className="w-6 h-6" />
                  <p>Sign up with Google</p>
                </button>

                <p className="text-gray-500 font-normal text-sm text-center mt-8">
                  Already have an account ?{" "}
                  <Link href="/auth/login">
                    <a className="text-sm text-violet-700 font-medium">
                      Log in
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{
          x: "100%",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.3,
            ease: "easeInOut",
          },
        }}
        exit={{
          x: "100%",
          transition: {
            duration: 0.5,
            delay: 1,
            ease: "easeInOut",
          },
        }}
        className="w-2/4 h-full relative hidden xl:block"
      >
        <Image
          src="https://res.cloudinary.com/dzzvve3hs/image/upload/v1647141546/Decor%20Assets/spacejoy-RUvW1KGD9a4-unsplash_ayzwmm.jpg"
          alt="login"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
    </motion.main>
  );
};

export default Signup;
