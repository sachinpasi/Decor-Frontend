import React, { useEffect, useState } from "react";
import { IOrderList } from "../../../../Interfaces/typings";
import { GetUserOrders } from "../../../../Utils";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const [Data, setData] = useState<any>();

  useEffect(() => {
    GetUserOrders().then((orders) => {
      setData(orders);
    });
  }, []);
  return (
    <div className="my-10">
      {Data?.map((order: any) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
