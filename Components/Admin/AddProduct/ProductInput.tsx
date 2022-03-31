import React, { useEffect, useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import { MdDelete } from "react-icons/md";

import FormInput from "../../Form/FormInput";
import FormSelect from "../../Form/FormSelect";
import FormTextArea from "../../Form/FormTextArea";
import Image from "next/image";
import { Admin__CreateProduct, GetCategories } from "../../../Utils";
import { useRouter } from "next/router";

const ProductInput = () => {
  const [Catgories, setCatgories] = useState([]);
  const [DisplayPhotoFile, setDisplayPhotoFile] = useState<any>(null);
  const [DisplayPhotoPreview, setDisplayPhotoPreview] = useState<any>(null);
  const [PhotosFiles, setPhotosFiles] = useState([]);
  const [PhotosPreview, setPhotosPreview] = useState<any>([]);
  const [PhotosError, setPhotosError] = useState<any>({});
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const PreviewDisplayImage = (data: any) => {
    if (data) {
      setDisplayPhotoFile(data);
      setPhotosError({});
    }
    setDisplayPhotoFile(data);
    const Reader = new FileReader();

    Reader.addEventListener(
      "load",
      function () {
        setDisplayPhotoPreview(Reader.result);
      },
      false
    );
    if (data) {
      Reader.readAsDataURL(data);
    }
  };

  const PreviewPhotos = (data: any) => {
    const files = Array.from(data);
    setPhotosFiles(data);

    Promise.all(
      files.map((file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev: any) => {
            resolve({
              src: ev.target.result,
              name: file?.name,
              size: file?.size,
            });
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    )
      .then((images) => {
        images?.forEach((file, i) => {
          if (i <= 2) {
            setPhotosPreview((a: any) => [...a, file]);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const RemovePhotosElement = (item: any) => {
    if (PhotosPreview.includes(item)) {
      setPhotosPreview((a: any) => a.filter((i: any) => i !== item));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      brand: "",
      price: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);

      if (!DisplayPhotoFile) {
        setPhotosError({
          displayPhoto: "Atleast 1 Picture is required",
        });
      }

      if (DisplayPhotoFile) {
        setisLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("brand", values.brand);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("displayPhoto", DisplayPhotoFile);

        for (let index = 0; index < PhotosFiles.length; index++) {
          formData.append("photos", PhotosFiles[index]);
        }

        console.log(formData);
        setisLoading(true);
        Admin__CreateProduct(formData)
          .then((res) => {
            toast.success("Product Saved Successfully");
            setisLoading(false);
            setTimeout(() => {
              router.push("/admin/products");
            }, 100);
          })
          .catch(() => {
            setisLoading(false);
          });
      }
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be atleast 3 characters"),
      category: yup.string().required("Category is required"),
      brand: yup.string().required("Brand Name is required"),
      price: yup.string().required("Price is required"),
      description: yup.string().required("Product Description is required"),
    }),
  });

  useEffect(() => {
    GetCategories()
      .then((res) => {
        setCatgories(res);
      })
      .catch();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full px-8 pt-6 flex items-start justify-between min-h-[calc(100vh-157px)] "
    >
      <div className="w-2/5 flex full flex-col">
        <div className="flex w-full flex-col items-start">
          <FormInput
            type="text"
            label="Product Name"
            name="name"
            className="h-11 !my-1.5 !rounded"
            placeholder="Enter Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.name}
          />
          <div className="flex items-start gap-4 w-full">
            <FormSelect
              label="Category"
              name="category"
              className="h-11 !my-1.5 !rounded"
              PlaceHolder="Select Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.category}
            >
              {Catgories.map((category: any, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </FormSelect>
            <div className="w-60">
              <FormInput
                type="number"
                label="Price"
                name="price"
                className="h-11 !my-1.5 !rounded"
                placeholder="Enter Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.errors.price}
              />
            </div>
          </div>
          <FormInput
            type="text"
            label="Brand"
            name="brand"
            className="h-11 !my-1.5 !rounded"
            placeholder="Enter Brand Name"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.brand}
          />
          <FormTextArea
            label="Description"
            rows={7}
            name="description"
            className=" !my-1.5 !rounded"
            placeholder="Enter Product Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.description}
          />
        </div>
      </div>
      <div className="w-3/5 pl-10 flex flex-col justify-between min-h-[496px]  h-full  ">
        <div className="w-full my-2 ">
          <h4 className="capitalize text-sm font-medium text-gray-700">
            Product Images
          </h4>
          <div className=" grid grid-cols-3 w-full h-60 my-2.5 gap-3.5">
            {DisplayPhotoPreview ? (
              <div className="w-56 row-span-2 h-full relative">
                <Image
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  src={DisplayPhotoPreview}
                  className="w-full h-full object-cover rounded-md "
                />
                <button
                  onClick={() => {
                    setDisplayPhotoFile(null);
                    setDisplayPhotoPreview(null);
                  }}
                  className="absolute -right-1 -bottom-1 bg-red-500 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition-transform"
                >
                  <MdDelete />
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                className="w-56 row-span-2 h-full cursor-pointer  rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center"
              >
                <svg
                  className="mx-auto h-8 w-8 -mt-2 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e: any) => {
                    PreviewDisplayImage(e.target.files[0]);
                  }}
                />
                <div className=" pt-4 flex flex-col items-center">
                  <span className="text-xs text-gray-800">Upload a file</span>
                  <p className="text-xs text-gray-500 pt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            )}

            {(PhotosPreview.length === 0 || PhotosPreview.length < 4) && (
              <>
                {PhotosPreview.length > 0 ? (
                  <div className="w-56 !row-span-2 h-full relative">
                    <Image
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      src={PhotosPreview[0].src}
                      className="w-full h-full object-cover rounded-md "
                    />
                    <button
                      onClick={() => RemovePhotosElement(PhotosPreview[0])}
                      className="absolute -right-1 -bottom-1 bg-red-500 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition-transform"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="multi-file-upload"
                    className="w-56 row-span-2 h-full cursor-pointer  rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center"
                  >
                    <svg
                      className="mx-auto h-8 w-8 -mt-2 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="multi-file-upload"
                      name="multi-file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => PreviewPhotos(e.target.files)}
                      multiple
                    />
                    <div className=" pt-4 flex flex-col items-center">
                      <span className="text-xs text-gray-800">
                        Upload a file
                      </span>
                      <p className="text-xs text-gray-500 pt-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                )}

                {PhotosPreview.length > 1 ? (
                  <div className="w-56  h-[113px]  relative">
                    <Image
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      src={PhotosPreview[1].src}
                      className="w-full h-full object-cover rounded-md "
                    />
                    <button
                      onClick={() => RemovePhotosElement(PhotosPreview[1])}
                      className="absolute -right-1 -bottom-1 bg-red-500 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition-transform"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="multi-file-upload2"
                    className="w-56 h-[113px] cursor-pointer  rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center"
                  >
                    <svg
                      className="mx-auto h-8 w-8 -mt-1 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="multi-file-upload2"
                      name="multi-file-upload2"
                      type="file"
                      className="sr-only"
                      onChange={(e) => PreviewPhotos(e.target.files)}
                      multiple
                    />
                    <div className=" pt-1 flex flex-col items-center">
                      <span className="text-xs text-gray-800">
                        Upload a file
                      </span>
                      <p className="text-xs text-gray-500 pt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                )}

                {PhotosPreview.length > 2 ? (
                  <div className="w-56  h-[113px]  relative">
                    <Image
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      src={PhotosPreview[2].src}
                      className="w-full h-full object-cover rounded-md "
                    />
                    <button
                      onClick={() => RemovePhotosElement(PhotosPreview[2])}
                      className="absolute -right-1 -bottom-1 bg-red-500 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition-transform"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="multi-file-upload3"
                    className="w-56 h-[113px] cursor-pointer  rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center"
                  >
                    <svg
                      className="mx-auto h-8 w-8 -mt-1 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="multi-file-upload3"
                      name="multi-file-upload3"
                      type="file"
                      className="sr-only"
                      onChange={(e) => PreviewPhotos(e.target.files)}
                      multiple
                    />
                    <div className=" pt-1 flex flex-col items-center">
                      <span className="text-xs text-gray-800">
                        Upload a file
                      </span>
                      <p className="text-xs text-gray-500 pt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                )}
              </>
            )}
          </div>
          <p className="text-sm text-red-500 ">{PhotosError.displayPhoto}</p>

          <p className="text-xs text-gray-500 ">
            First Picture here will be used as primary picture for the product.
            You can add upto 4 Pictures.
          </p>
        </div>

        <div className="flex h-10 justify-end">
          <button
            type="submit"
            className=" px-10 bg-[#023E73] text-white rounded text-sm uppercase tracking-wide"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductInput;
