import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

import { INavLink } from "../../../Interfaces/typings";
import { useAppSelector } from "../../../Redux/hooks";

const Navbar = () => {
  const [isNavOpen, setisNavOpen] = useState(false);
  const User = useAppSelector((state) => state.user);
  return (
    <nav className="w-full">
      <div className=" hidden xl:flex container py-4  items-center justify-between">
        <Link href="/">
          <a className="text-4xl font-bebas">DECOR</a>
        </Link>

        <div className="flex items-center space-x-8">
          <NavItem name="Shop" href="/shop" />
          {User.isLoggedIn ? (
            User.role === "admin" ? (
              <Link href="/admin/dashboard">
                <a>
                  <AiOutlineUser className=" h-6 w-6" />
                </a>
              </Link>
            ) : (
              <Link href="/user/account">
                <a>
                  <AiOutlineUser className=" h-6 w-6" />
                </a>
              </Link>
            )
          ) : (
            <Link href="/auth/login">
              <a>
                <AiOutlineUser className=" h-6 w-6" />
              </a>
            </Link>
          )}

          <Link href="/cart">
            <a>
              <AiOutlineShoppingCart className=" h-6 w-6" />
            </a>
          </Link>
        </div>
      </div>
      <div className="container flex items-center justify-between py-6 relative xl:hidden z-20">
        <button
          onClick={() => setisNavOpen(!isNavOpen)}
          className="relative flex items-center justify-center w-9 h-9"
        >
          <div
            style={{
              transition:
                "transform 250ms cubic-bezier(.2,.6,.3,1),width 250ms cubic-bezier(.2,.6,.3,1)",
              willChange: "transform,width",
            }}
            className={classNames(
              isNavOpen
                ? "translate-x-[3.5px] rotate-[-135deg] w-7"
                : "-translate-y-[5.5px] w-full",
              "bg-black absolute top-0 left-0 bottom-0 m-auto  h-[1px] "
            )}
          ></div>
          <div
            style={{
              transition:
                "transform 250ms cubic-bezier(.2,.6,.3,1),width 250ms cubic-bezier(.2,.6,.3,1)",
              willChange: "transform,width",
            }}
            className="bg-black absolute top-0 left-0 bottom-0 m-auto w-full h-[1px] scale-0"
          ></div>
          <div
            style={{
              transition:
                "transform 250ms cubic-bezier(.2,.6,.3,1),width 250ms cubic-bezier(.2,.6,.3,1)",
              willChange: "transform,width",
            }}
            className={classNames(
              isNavOpen
                ? "translate-x-[3.5px] rotate-[135deg] w-7"
                : "translate-y-[5.5px] w-full",
              "bg-black absolute top-0 left-0 bottom-0 m-auto  h-[1px] "
            )}
          ></div>
        </button>
        <div className="absolute left-2/4 -translate-x-2/4 mt-0.5">
          <Link href="/">
            <a className="text-3xl font-bebas">DECOR</a>
          </Link>
        </div>
        <Link href="/cart">
          <a>
            <AiOutlineShoppingCart className=" h-6 w-6" />
          </a>
        </Link>
      </div>
      <div
        style={{
          transition:
            "visibility 600ms cubic-bezier(.4,0,.2,1),opacity 400ms cubic-bezier(.4,0,.2,1)",
          willChange: "opacity,visibility",
        }}
        className={classNames(
          isNavOpen ? "opacity-100 visible" : " opacity-0 invisible",
          "pt-[84px] fixed z-10 flex flex-col top-0 right-0 bottom-0 left-0 will xl:hidden"
        )}
      >
        <div
          className={classNames(
            isNavOpen ? "opacity-100 visible" : " opacity-0 invisible",
            "absolute top-0 bottom-0 left-0 right-0 bg-white"
          )}
        ></div>
        <div
          className={classNames(
            isNavOpen ? "opacity-100 visible" : " opacity-0 invisible",
            "relative flex flex-col flex-grow flex-shrink-0"
          )}
        >
          <nav
            style={{
              transition: "transform 600ms cubic-bezier(.4,0,.2,1)",
            }}
            className={classNames(
              isNavOpen
                ? "opacity-100 visible translate-y-0"
                : " opacity-0 invisible translate-y-5",
              "relative flex-grow w-full "
            )}
          >
            <div
              style={{
                transition: "transform 600ms cubic-bezier(.4,0,.2,1)",
                willChange: "transform",
              }}
              className={classNames(
                isNavOpen ? "opacity-100 visible " : " opacity-0 invisible ",
                "absolute flex top-0 left-0 w-full min-h-full max-h-full justify-start overflow-y-scroll overflow-x-hidden flex-col"
              )}
            >
              <div
                className={classNames(
                  isNavOpen ? "opacity-100 visible " : " opacity-0 invisible ",
                  "relative flex w-full flex-grow flex-shrink-0 justify-center flex-col"
                )}
              >
                <div className="relative w-full box-border px-16">
                  <Link href="/shop">
                    <a
                      style={{
                        transition: " opacity 250ms cubic-bezier(.4,0,.2,1)",
                      }}
                      className="relative block my-3 mx-5 text-3xl text-center"
                    >
                      Shop
                    </a>
                  </Link>
                </div>
                <div className="relative w-full box-border px-16">
                  <Link href="/wishlist">
                    <a
                      style={{
                        transition: " opacity 250ms cubic-bezier(.4,0,.2,1)",
                      }}
                      className="relative block my-3 mx-5 text-3xl text-center"
                    >
                      Wishlist
                    </a>
                  </Link>
                </div>
                <div className="relative w-full box-border px-16">
                  <Link href="/auth/login">
                    <a
                      style={{
                        transition: " opacity 250ms cubic-bezier(.4,0,.2,1)",
                      }}
                      className="relative block my-3 mx-5 text-3xl text-center"
                    >
                      Login
                    </a>
                  </Link>
                </div>
              </div>

              <div className="header-menu-actions"></div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavItem = ({ href, name }: INavLink) => (
  <Link href={href}>
    <a className="text-base font-normal ">{name}</a>
  </Link>
);
