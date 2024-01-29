import React, { useEffect } from "react";
import Image from "next/image";
import foodImg1 from "../../../assets/images/foodImages/foodImg1.svg";
import styles from "./homesection3.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const HomeSection3 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offer"],
    queryFn: async () => {
      const response = await axios.get("/api/offer");
      return response.data;
    },
  });

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
  if (isError) return <div className="text-white">error...</div>;

  // useEffect(() => {
  //     AOS.init()
  // }, [])

  return (
    <>
      <section className="lg:mb-36 mx-3" data-aos="zoom-in-down">
        {data?.result.data.map((main) =>(
           <div className={styles['offer-card']}>
            <div className="lg:w-3/4">
                <h3 className={styles.menu}>{main?.name}</h3>
              <p className={styles["menu-para"]}>
                {main?.description}
              </p>           
            </div>
            <div>
              <Image className={styles.imagination} src={main?.img_url} width={300} height={300} alt="food-image" />
            </div>
           </div>
        ))}
       
      </section>
    </>
  );
};

export default HomeSection3;
