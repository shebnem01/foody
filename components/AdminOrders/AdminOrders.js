"use client";
import React, { useEffect } from "react";
import styles from "../AdminCategory/admincategory.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BounceLoader } from "react-spinners";
import OrderItem from "./OrderItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminOrders = () => {
  const { data: orderData, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("access_token");

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const { data } = await axios.get("/api/order", { headers });
      return data;
    },
  });
  useEffect(() => {
    AOS.init();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-0 my-auto">
        <BounceLoader
          color="#C74FEB"
          loading={true}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) return <div className="text-white">{error}</div>;
  return (
    <>
      <section className="h-full" data-aos="zoom-in">
        <div className={styles["table-container"]}>
          <table className={styles["table"]}>
            <thead className={styles["thead"]}>
              <tr className={styles["thead-row"]}>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Time</th>
                <th>Delivery Address</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody className={styles["tbody"]}>
              <OrderItem orderData={orderData} />
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminOrders;
