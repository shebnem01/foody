import Image from "next/image";
import React from "react";
import styles from "./restaurantdetailleft.module.css";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const RestaurantDetailLeft = ({ id }) => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products");
      return data;
    },
  });
  const { mutate: addProductToBasket } = useMutation({
    mutationFn: async (productId) => await axios.post('/api/basket/add', {
      product_id: productId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }),
    onSuccess: (data) => {
      toast.success("Product add to cart")
      queryClient.invalidateQueries(["basket"]);
    },
    onError: (error) => {
      console.log("erro")
    }
  })
  const router = useRouter();
  const increaseProductCount = (productId) => {
    if (localStorage.getItem('access_token')) {
      addProductToBasket(productId);

    } else {
      router.push("/login")
    }
  }

  const productData = data?.result?.data;
  const restaurantProducts = productData?.filter((item) => item.rest_id === id);
  return (
    <>
      <ToastContainer autoClose={8000} />
      <div className={styles["products-bg"]}>
        <div className={styles["products-text"]}>
          <h2>{t("Products")}</h2>
        </div>
        {restaurantProducts?.map((item) => {
          return (
            <div className={styles["product-card"]} key={item.id}>
              <div className="flex">
                <div className="lg:mr-9">
                  <Image className={styles.img}
                    width={100}
                    height={100}
                    src={item?.img_url}
                    alt="food"
                  />
                </div>
                <div className={styles["detail-title"]}>
                  <h3>{item?.name}</h3>
                  <span>{(item?.description).length > 68 ? (item?.description).slice(0, 68) + '...' : item?.description}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={styles.from}>
                  From <span className={styles.price}>${item?.price}</span>
                </span>
                <button className={styles["plus-btn"]} onClick={() => increaseProductCount(item?.id)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantDetailLeft;
