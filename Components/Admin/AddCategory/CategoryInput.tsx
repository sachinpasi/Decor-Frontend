import React, { useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import FormInput from "../../Form/FormInput";
import { Admin__CreateCategory } from "../../../Utils";
import { useRouter } from "next/router";

const CategoryInput = () => {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: ({ name }) => {
      setisLoading(true);
      Admin__CreateCategory({
        name,
      })
        .then((res) => {
          toast.success("Category Saved Successfully");
          setisLoading(false);
          setTimeout(() => {
            router.push("/admin/categories");
          }, 300);
        })
        .catch(() => {
          setisLoading(false);
        });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be atleast 3 characters"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full px-8 pt-6 flex items-start justify-between min-h-[calc(100vh-157px)] "
    >
      <div className="w-2/5 flex full flex-col">
        <FormInput
          type="text"
          label="Category Name"
          name="name"
          className="h-11 !my-1.5 !rounded"
          placeholder="Enter Category Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.name}
        />
        <div className="flex h-10 justify-end">
          <button
            type="submit"
            className=" px-10 bg-[#023E73] text-white rounded text-sm uppercase tracking-wide"
          >
            Add Category
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryInput;
