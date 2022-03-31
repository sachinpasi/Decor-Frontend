import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";
import { BiArrowBack } from "react-icons/bi";
import { Admin__DeleteCustomerById, GetCustomerDetails } from "../../../Utils";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import EditCustomer from "../../../Components/Admin/EditCustomer/EditCustomer";

const CustomerDetails = () => {
  const [User, setUser] = useState<any>();
  const router = useRouter();

  const HeaderData = {
    Title: User?.name,
    Button: [],
    Links: [
      {
        Title: "Back To Customers",
        Href: "/admin/customers",
        Icon: BiArrowBack,
      },
    ],
    Delete: [
      {
        Title: "Delete Account",
        Icon: MdDelete,
      },
    ],
  };

  useEffect(() => {
    if (router.query?.id) {
      GetCustomerDetails(router.query?.id).then(({ user }) => {
        setUser(user);
      });
    }
  }, [router.query?.id]);
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <motion.div className="w-[calc(100%-15rem)] ml-auto">
        <Header HeaderData={HeaderData} setActiveCategory={() => {}} />
        <EditCustomer User={User} />
      </motion.div>
    </main>
  );
};

export default CustomerDetails;
