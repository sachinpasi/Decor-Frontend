import axios from "axios";
import { getCookie } from "cookies-next";

import { BASEURL } from "../Components/Api/BaseUrl";
import { IAuth, IStock } from "../Interfaces/typings";

export const Login = async ({ email, password }: IAuth) => {
  return await axios.post(`${BASEURL}/login`, {
    email,
    password,
  });
};

export const SignUp = async ({ email, password, name }: IAuth) => {
  return await axios.post(`${BASEURL}/signup`, {
    email,
    password,
    name,
    confirmPassword: password,
  });
};

export const GetCategories = async () => {
  const res = await axios.get(`${BASEURL}/category/all`);
  return res.data.categories;
};

export const GetProducts = async (params?: any) => {
  const res = await axios.get(`${BASEURL}/product/getAllProducts`, {
    params: params,
  });
  return res.data.products;
};

export const GetProductDetails = async (id: any) => {
  const res = await axios.get(`${BASEURL}/product/getProductById/${id}`);
  return res.data.product;
};

export const GetUserDetails = async () => {
  const res = await axios.get(`${BASEURL}/getUserDetails`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return res.data.user;
};

export const GetUserOrders = async () => {
  const res = await axios.get(`${BASEURL}/order/getAllOrdersByUserId`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return res.data.orders;
};

export const GetOrderDetails = async (id: any) => {
  const res = await axios.get(`${BASEURL}/order/getOrderById/${id}`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return res.data.order;
};

//ADMIN---------------

export const Admin__GetAllProducts = async () => {
  return await axios.get(`${BASEURL}/admin/product/getAllProducts`, {
    params: {
      // search: Query,
      // sortField: SortField,
      // sortCriteria: SortCriteria,
      // category: Category !== "" ? Category : null,
      // page: page,
      // resultPerPage: 5,
    },
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};

export const Admin__CreateProduct = async (formData: any) => {
  const res = await axios.post(`${BASEURL}/admin/product/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  return res.data;
};

export const Admin__CreateCategory = async (name: any) => {
  const res = await axios.post(`${BASEURL}/category/create`, name, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  return res.data;
};

export const Admin__GetAllCustomers = async () => {
  return await axios.get(`${BASEURL}/admin/users`, {
    params: {
      // search: Query,
      // sortField: SortField,
      // sortCriteria: SortCriteria,
      // category: Category !== "" ? Category : null,
      // page: page,
      // resultPerPage: 5,
    },
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};

export const GetCustomerDetails = async (id: any) => {
  const res = await axios.get(`${BASEURL}/admin/getUserById/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.data;
};
export const Admin__UpdateCustomer = async ({ id, formData }: any) => {
  const res = await axios.put(
    `${BASEURL}/admin/updateUserById/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );

  return res.data;
};

export const Admin__DeleteCustomerById = async (id: any) => {
  const res = await axios.delete(`${BASEURL}/admin/deleteUserById/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.data;
};

export const Admin__UpdateProductStock = async ({ id, addBy }: IStock) => {
  const res = await axios.put(
    `${BASEURL}/admin/product/addstock/${id}`,
    {
      addBy,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );

  return res.data;
};

//// Payment

export const Get__Razorpay_Key = async () => {
  const res = await axios.get(`${BASEURL}/razorpaykey`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.data;
};

export const Initialize_Payement = async ({ amount }: any) => {
  const res = await axios.post(
    `${BASEURL}/razorpay/payment`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );
  return res.data;
};

export const PlaceOrder = async (data: any) => {
  const res = await axios.post(`${BASEURL}/order/create`, data, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.data;
};
