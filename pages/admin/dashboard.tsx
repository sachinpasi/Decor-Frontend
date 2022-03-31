import React from "react";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <div className="w-[calc(100%-15rem)] ml-auto"></div>
    </main>
  );
};

export default AdminDashboard;
