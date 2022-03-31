import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useAppSelector } from "../../Redux/hooks";
import Layout from "../../Components/Layout/Layout";
import Sidebar from "../../Components/User/Account/Sidebar/Sidebar";
import Banner from "../../Components/User/Account/Profile/Banner";
import Header from "../../Components/User/Account/Profile/Header";
import DetailsSection from "../../Components/User/Account/Profile/DetailSection";
import { GetUserDetails } from "../../Utils";

type Props = {};

const Account = (props: Props) => {
  const [UserDetails, setUserDetails] = useState();
  const [GetReload, setGetReload] = useState(false);
  const User = useAppSelector((state) => state.user);

  useEffect(() => {
    if (User.isLoggedIn) {
      GetUserDetails()
        .then((res) => setUserDetails(res))
        .catch();
    }
  }, [User, GetReload]);

  return (
    <Layout>
      <main className="container mx-auto flex flex-col items-start  justify-between xl:flex-row ">
        <Sidebar />
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="min-h-screen w-full xl:w-[calc(100%-15rem)] "
        >
          <Banner />
          <Header />
          <DetailsSection
            UserDetails={UserDetails}
            setGetReload={setGetReload}
            GetReload={GetReload}
          />
        </motion.div>
      </main>
    </Layout>
  );
};

export default Account;
