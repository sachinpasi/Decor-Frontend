import React from "react";
import ShippingInfo from "../Components/User/CheckOut/ShippingInfo";
import Summary from "../Components/User/CheckOut/Summary";

const Checkout = () => {
  return (
    <main className="flex">
      <ShippingInfo />
      <Summary />
    </main>
  );
};

export default Checkout;
