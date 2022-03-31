import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Admin__UpdateProductStock } from "../../../Utils";

import FormInput from "../../Form/FormInput";

interface I {
  isStockOpen: string;
  setisStockOpen: (value: string) => void;
  GetReload: boolean;
  setGetReload: (value: boolean) => void;
}

const StockUpdate = ({
  isStockOpen,
  setisStockOpen,
  GetReload,
  setGetReload,
}: I) => {
  function closeModal() {
    setisStockOpen("");
  }

  const formik = useFormik({
    initialValues: {
      addBy: "",
    },
    onSubmit: ({ addBy }, { resetForm }) => {
      Admin__UpdateProductStock({ addBy: addBy, id: isStockOpen }).then(() => {
        toast.success("Stock Added Successfully");
        setTimeout(() => {
          closeModal();
          resetForm();
          setGetReload(!GetReload);
        }, 200);
      });
    },
    validationSchema: yup.object({
      addBy: yup.number().required("Stock Amount is required"),
    }),
  });

  return (
    <Transition appear show={isStockOpen ? true : false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form
              onSubmit={formik.handleSubmit}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add Stock
              </Dialog.Title>
              <div className="mt-2">
                <FormInput
                  type="number"
                  name="addBy"
                  placeholder="Enter Stock Value..."
                  value={formik.values.addBy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.addBy}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  // onClick={closeModal}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StockUpdate;
