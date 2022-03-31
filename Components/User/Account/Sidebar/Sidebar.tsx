import React from "react";
import { FiHeart, FiLogOut, FiShoppingBag } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { MdOutlineLocationOn, MdPassword } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { BsChevronDown } from "react-icons/bs";
import classNames from "classnames";

import SidebarLink from "./SidebarLink";
import { useAppDispatch } from "../../../../Redux/hooks";
import { LOGOUT } from "../../../../Redux/Slices/UserSlice";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const HandleLogout = () => {
    dispatch(LOGOUT());
    router.push("/auth/login");
  };

  return (
    <aside className="my-10 flex w-full flex-col justify-center gap-2 xl:w-60 ">
      <div className="xl:hidden ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className={"flex w-full items-center"}>
                {SidebarLinks.map((Link) => {
                  if (router.pathname === Link.href) {
                    return (
                      <a
                        key={Link.href}
                        className={classNames(
                          router.pathname == Link.href
                            ? "rounded-md bg-theme-blue-light font-semibold "
                            : "rounded-md font-medium hover:bg-gray-50 ",
                          "flex  w-full items-center justify-between px-4 py-2 xl:w-48   "
                        )}
                      >
                        <div className="flex items-center  gap-4">
                          <Link.Icon className="w-6 text-xl  " />
                          <p className="-mb-0.5 align-baseline text-lg tracking-wide ">
                            {Link.name}
                          </p>
                        </div>

                        <BsChevronDown
                          className={classNames(open ? "rotate-180" : "")}
                        />
                      </a>
                    );
                  }
                })}
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel>
                  <Disclosure.Button className={"w-full"}>
                    {SidebarLinks.map((link) => {
                      if (router.pathname !== link.href) {
                        return (
                          <SidebarLink
                            key={link.href}
                            href={link.href}
                            name={link.name}
                            Icon={link.Icon}
                          />
                        );
                      }
                    })}
                  </Disclosure.Button>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      <div className="hidden w-full xl:block ">
        {SidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            name={link.name}
            Icon={link.Icon}
            onClick={HandleLogout}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

const SidebarLinks = [
  { name: "Account", href: "/user/account", Icon: FiUser },
  { name: "Orders", href: "/user/orders", Icon: FiShoppingBag },
  { name: "Wishlist", href: "/user/wishlist", Icon: FiHeart },
  { name: "Address", href: "/user/address", Icon: MdOutlineLocationOn },
  { name: "Password", href: "/user/password", Icon: MdPassword },
  { name: "Logout", href: "", Icon: FiLogOut },
];
