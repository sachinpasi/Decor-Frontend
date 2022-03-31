import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as yup from "yup";

import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import FormInput from "../../Components/Form/FormInput";
import { Login } from "../../Utils";
import { useAppDispatch } from "../../Redux/hooks";
import { LOGIN_USER } from "../../Redux/Slices/UserSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      Login({
        email,
        password,
      })
        .then(({ data }) => {
          dispatch(
            LOGIN_USER({
              isLoggedIn: true,
              userId: data.user._id,
              token: data.user.token,
              role: data.user.role,
            })
          );
          router.push("/");
        })
        .catch();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
  });

  return (
    <motion.main
      key="LoginPage"
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
          <div className="absolute top-4">
            <Link href="/">
              <a className="text-4xl font-bebas ">DECOR</a>
            </Link>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-96">
              <h3 className="text-3xl font-bebas py-2">Welcome BACK</h3>
              <p className="text-gray-500 tracking-wide">
                Welcome back! Please enter your credential.
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-8 "
              >
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
                  name="password"
                  label="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.password}
                />
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-700 text-sm"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link href="/">
                    <a className="text-sm font-medium text-[#6941C6]">
                      Forgot password
                    </a>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full h-11 bg-black text-white rounded-md my-2"
                >
                  Sign in
                </button>
                <button className="w-full h-11 border border-gray-300  rounded-md my-2 flex items-center justify-center space-x-2">
                  <FcGoogle className="w-6 h-6" />
                  <p>Sign in with Google</p>
                </button>

                <p className="text-gray-500 font-normal text-sm text-center mt-8">
                  Don&apos;t have an account ?{" "}
                  <Link href="/auth/signup">
                    <a className="text-sm text-violet-700 font-medium">
                      Sign up
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

export default LoginPage;
