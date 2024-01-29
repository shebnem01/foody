"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./admincategory.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CategoryItem from "./CategoryItem";
import { BounceLoader } from "react-spinners";

const AdminCategory = () => {
  // get category

  const { data, isLoading, error } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const { data } = await axios.get('/api/category')
      return data
    },
  })

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
  if (error) return <div className="text-white">error...</div>;
  return (
    <>
      <section className="h-full" data-aos="zoom-in">
        <div className={styles["table-container"]}>
          <table className={styles["table"]}>
            <thead className={styles["thead"]}>
              <tr className={styles["thead-row"]}>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Slugs</th>
              </tr>
            </thead>

            <tbody className={styles["tbody"]}>
              <CategoryItem categoryData={...data} />
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminCategory;
