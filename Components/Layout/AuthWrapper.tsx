import axios from "axios";
import { checkCookies, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../Redux/hooks";
import { REFRESS_SESSION } from "../../Redux/Slices/UserSlice";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (checkCookies("token")) {
      const Token = getCookie("token");
      const UserId = getCookie("userId");
      const Role = getCookie("role");

      if (Token) {
        dispatch(
          REFRESS_SESSION({
            isLoggedIn: true,
            userId: UserId,
            token: Token,
            role: Role,
          })
        );
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
