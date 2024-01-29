"use client";
import { useEffect, useState } from "react";
import styles from "./rightsidebar.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BounceLoader } from "react-spinners";

function Foodydetail(categoryId) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/restuarants/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessJWT")}`,
        },
      });
      return data;
    },
  });




  const resultData = data?.result?.data;
  const [filteredRestaurants, setFilteredRestaurants] = useState(resultData || []);
  console.log(resultData)
  useEffect(() => {
    setFilteredRestaurants(resultData);
    if (categoryId) {
      const filtered = resultData?.filter(
        (item) => item.category_id === categoryId.categoryId
      );

      setFilteredRestaurants(filtered);
    }
  }, [categoryId, resultData]);
  useEffect(() => {
    setFilteredRestaurants(resultData);
  }, [resultData]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-0 my-auto  w-full h-full">
        <BounceLoader
          color="#D63626"
          loading={true}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
 </div>
    );
  }
  if (isError) return <div className="text-white">error...</div>;
  return (
    <div className={`${styles["res-card-container"]}`} >
      {filteredRestaurants?.map((item) => {
        return (
          <div
            className={styles["res-card"]}
            key={item?.id}
            onClick={() => router.push(`/restaurants/${item?.id}`)}
          >
            <img
              className={styles.img_div}
              src={item?.img_url}
              alt="coffeemania"
            />
            <div className="pr">{item?.products}</div>
            <div>
              <h1 className={styles.coffdiv}>{item?.name.length>12?item?.name.slice(0,12)+"...":item?.name}</h1>
              <span className={styles.spn_div}>{item?.cuisine}</span>
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <p className={styles.pdiv}>${item?.delivery_price}Delivery</p>
                <span className={styles.btndiv}> {item?.delivery_min} min</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Foodydetail;
