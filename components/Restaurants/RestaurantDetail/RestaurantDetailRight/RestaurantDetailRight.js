import Image from "next/image";
import basket from "../../../../assets/icons/basket.svg";
import delIcon from "../../../../assets/icons/delIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./restaurantdetailright.module.css";
import emptyBasket from "../../../../assets/icons/emptyBasket.png";
import React from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const RestaurantDetailRight = () => {
  const queryClient = useQueryClient();
  const { mutate: addProductToBasket } = useMutation({
    mutationFn: async (productId) =>
      await axios.post(
        "/api/basket/add",
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: userBasket } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      const { data } = await axios.get(
        "/api/basket",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
        {
          onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["basket"]);
          },
        }
      );
      return data;
    },
  });
  const { mutate: delProductToBasket } = useMutation({
    mutationFn: async (productId) =>
      await axios.delete("/api/basket/delete", {
        data: {
          product_id: productId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: clearBasket } = useMutation({
    mutationFn: async (basketId) =>
      await axios.delete("/api/basket/clear", {
        data: {
          basket_id: basketId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    onSuccess: () => {
      // alert('success')
      queryClient.invalidateQueries(["basket"]);
    },
    onError: (error) => {
      console.log(error);
      alert("error", error);
    },
  });

  const increaseProductCount = (productId) => {
    addProductToBasket(productId);
  };

  const decreaseProductCount = (productId) => {
    delProductToBasket(productId);
    console.log(productId);
  };

  const handleClearBasket = (basketId) => {
    clearBasket(basketId);
  };
  const { t } = useTranslation("common");
  const basketItems = userBasket?.result.data.items;
  return (
    <>
      {" "}
      {typeof basketItems === "undefined" || basketItems?.length === 0 ? (
        <div className={styles.empty}>
          <Image
            width={800}
            height={1200}
            className="mx-auto"
            src={emptyBasket}
            alt="empty-basket"
          />
        </div>
      ) : (
        <div className={styles["basket-bg"]}>
          <>
            <div className={styles["basket-top"]}>
              <div className="flex">
                <Image className="mr-2" src={basket} alt="basket" />
                <span className={styles["basket-items"]}>
                  {basketItems?.length} {t("items")}
                </span>
              </div>
              <button
                className={styles["clear-btn"]}
                onClick={() => handleClearBasket(userBasket?.result?.data?.id)}
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-col justify-between ">
              <div className={styles["basket-middle"]}>
                {basketItems?.map((basket) => (
                  <div key={basket?.id} className={styles["basket-card"]}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-14">
                          <Image
                            src={basket?.img_url}
                            width={200}
                            height={200}
                            alt="food"
                          />
                        </div>
                      </div>
                      <div className={styles["food-head"]}>
                        <h3 className="w-[240px] font-medium">
                          {basket?.name}
                        </h3>
                        <span className="text-[#4F4F4F] text-sm">
                          ${basket?.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex -ml-5">
                      <div className="flex flex-col mr-5 bg-white px-3 rounded-2xl">
                        <button
                          onClick={() => increaseProductCount(basket?.id)}
                        >
                          +
                        </button>
                        <span className="font-bold">{basket?.count}</span>
                        <button
                          onClick={() => decreaseProductCount(basket?.id)}
                        >
                          -
                        </button>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-5 lg:hidden block w-[90%]">
                <Link
                  href="/user?page=user-checkout"
                  className={styles["basket-checkout"]}
                >
                  <span className={styles["checkout-text"]}>
                    {t("Checkout")}
                  </span>
                  <div className={styles["checkout-bg"]}>
                    $ {userBasket?.result.data.total_amount}
                  </div>
                </Link>
              </div>
            </div>

            <div className="absolute lg:block hidden bottom-5 left-5 w-[90%]">
              <Link
                href="/user?page=user-checkout"
                className={styles["basket-checkout"]}
              >
                <span className={styles["checkout-text"]}>{t("Checkout")}</span>
                <div className={styles["checkout-bg"]}>
                  $ {userBasket?.result.data.total_amount}
                </div>
              </Link>
            </div>
          </>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default RestaurantDetailRight;
