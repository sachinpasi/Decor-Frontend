import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { IconType } from "react-icons/lib";

interface SideLinkProps {
  name: string;
  href?: string;
  Icon: IconType;
  onClick?: (ev: React.MouseEvent) => void;
}

const SidebarLink = ({ href, name, Icon, onClick }: SideLinkProps) => {
  const router = useRouter();

  if (!href) {
    return (
      <button onClick={onClick} className="w-full">
        <a
          className={classNames(
            router.pathname == href
              ? "rounded-md bg-[#f1f7fa] font-medium "
              : "rounded-md  hover:bg-gray-50 ",
            "flex w-full items-center gap-4 px-4 py-2 xl:w-48 -ml-4   "
          )}
        >
          <Icon className="w-6 text-xl  " />
          <p className="-mb-0.5 align-baseline text-base tracking-wide ">
            {name}
          </p>
        </a>
      </button>
    );
  } else {
    return (
      <Link href={href}>
        <a
          className={classNames(
            router.pathname.includes(href)
              ? "rounded-md bg-[#f1f7fa] font-medium "
              : "rounded-md  hover:bg-gray-50 ",
            "flex  w-full items-center gap-4 px-4  py-2 xl:w-48 -ml-4   "
          )}
        >
          <Icon className="w-6 text-xl  " />
          <p className="-mb-0.5 align-baseline text-base tracking-wide ">
            {name}
          </p>
        </a>
      </Link>
    );
  }
};

export default SidebarLink;
