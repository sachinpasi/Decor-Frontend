import React, { useEffect, useState } from "react";
import * as yup from "yup";

import { RadioGroup } from "@headlessui/react";
import FormInput from "../../Form/FormInput";
import { useFormik } from "formik";
import { IAdminUser } from "../../../Interfaces/typings";
import { Admin__UpdateCustomer } from "../../../Utils";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const plans = [
  {
    name: "Customer",
    id: "user",
  },
  {
    name: "Admin",
    id: "admin",
  },
];

const EditCustomer = ({ User }: IAdminUser) => {
  const [selected, setSelected] = useState<any>();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: User?.name,
      email: User?.email,
      phoneNumber: User?.phoneNumber,
    },
    enableReinitialize: true,
    onSubmit: ({ email, name, phoneNumber }) => {
      const formData = new FormData();
      if (name) {
        formData.append("name", name);
      }
      if (email) {
        formData.append("email", email);
      }
      if (phoneNumber) {
        formData.append("phoneNumber", phoneNumber.toString());
      }
      if (User.role !== selected?.id) {
        formData.append("role", selected?.id);
      }
      Admin__UpdateCustomer({ id: router.query?.id, formData }).then(() => {
        toast.success("Saved Changes Successfully");
      });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be atleast 3 characters"),
      email: yup.string().email("Invalid Email").required("Required"),
      phoneNumber: yup.number().min(10).max(10),
    }),
  });

  useEffect(() => {
    if (User?.role === "user") {
      setSelected(plans[0]);
    } else if (User?.role === "admin") {
      setSelected(plans[1]);
    }
  }, [User]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full  px-8 pt-6 flex items-start justify-between"
    >
      <div className="w-full  mx-auto">
        <div className="w-2/4 my-8">
          <FormInput
            type="text"
            label="Name"
            name="name"
            className="h-11 !my-1.5 !rounded"
            placeholder={"Enter Your Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.name}
          />
          <FormInput
            type={"email"}
            name="email"
            label="Email"
            className="h-11 !my-1.5 !rounded"
            placeholder={"Enter Your Email"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormInput
            type={"text"}
            name="phoneNumber"
            label="Phone Number"
            className="h-11 !my-1.5 !rounded"
            placeholder={"Enter Your Phone Number"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
        </div>
        <RadioGroup value={selected} onChange={setSelected}>
          <div className=" w-2/4 flex items-center justify-center gap-x-4">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-black ring-white ring-opacity-60"
                      : "ring-2 ring-offset-2 ring-offset-black ring-white ring-opacity-40"
                  }
                  ${checked ? "bg-black text-white" : "bg-white"}
                    relative rounded-md shadow-md px-8 py-4 cursor-pointer flex focus:outline-none w-2/4`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-2xl py-2 font-bebas tracking-wide  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <div className="flex h-10 mt-20  justify-end">
          <button
            type="submit"
            className=" px-10 bg-[#023E73] text-white rounded text-sm uppercase tracking-wide"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCustomer;

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
