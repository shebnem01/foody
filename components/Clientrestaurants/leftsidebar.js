import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./leftsidebar.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Leftres({ handleCategoryClick}) {
  const [showMobFilter, setShowMobFilter] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axios.get("/api/category");
    
      console.log(showMobFilter)
      return data;

    },
  });
  const getCategory=(id,name)=>{
    setShowMobFilter(prevFilter=>!prevFilter);
    handleCategoryClick(id,name);
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const resultData = data?.result?.data;
  return (
    <>
      <button className="lg:hidden flex items-center gap-10 shadow w-full p-4 text-center justify-center my-4" onClick={()=>setShowMobFilter(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
        >
          <path
            d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z"
            fill="#4F4F4F"
          />
        </svg>
        Filter
      </button>
      <div className={styles.leftresdiv} data-aos="fade-right">
        {resultData?.map((category) => {
          return (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category?.id,category?.name)}
            >
              <div className={styles["res-category"]}>
                <Image
                  width={30}
                  height={30}
                  alt="img"
                  src={category?.img_url}
                ></Image>
                {category?.name.slice(0, 12)}
              </div>
            </div>
          );
        })}
      </div>
      {showMobFilter&& (
  <>
  <div className={styles.overlay} onClick={()=>setShowMobFilter(false)}></div>
      <div className={styles["mobile-filter"]}>
        <div className={styles["close-filter"]} onClick={()=>setShowMobFilter(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#BDBDBD"
            />
          </svg>

        </div>
        <ul>
        {resultData?.map((category) => {
          return (
            <li 
              key={category?.id}
              onClick={()=>getCategory(category?.id)}
            >
                {category?.name.slice(0, 12)}
           
            </li>
          );
        })}
        </ul>
      </div>
  </>
 )}
    </>
  );
}

export default Leftres;
