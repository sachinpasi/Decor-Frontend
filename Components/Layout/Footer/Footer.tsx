import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black ">
      <div className="container flex items-start justify-between py-8">
        <h3 className="text-4xl font-bebas text-white">DECOR</h3>
        <div className="flex items-center space-x-6">
          <Link href="/shop">
            <a className="text-white border-b">Shop</a>
          </Link>{" "}
          <Link href="/">
            <a className="text-white border-b">About</a>
          </Link>
          <Link href="/">
            <a className="text-white border-b">Contact</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
