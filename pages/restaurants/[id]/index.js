"use client";
import ClientContainer from "../../../components/common/ClientContainer/ClientContainer";
import styles from "./restaurantdetail.module.css";
import RestaurantDetailLeft from "../../../components/Restaurants/RestaurantDetail/RestaurantDetailLeft/RestaurantDetailLeft";
import RestaurantDetailRight from "../../../components/Restaurants/RestaurantDetail/RestaurantDetailRight/RestaurantDetailRight";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import basket from "../../../assets/icons/basket.svg";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import empty2 from "../../../assets/images/emty2.svg";
const index = () => {
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const router = useRouter();

  const { id } = router.query;

  const { t } = useTranslation("common");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/restuarants/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessJWT")}`,
        },
      });
      return data;
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
  const handleClearBasket = (basketId) => {
    clearBasket(basketId);
  };
  const resultData = data?.result?.data;
  const singleRestItem = resultData?.filter((item) => item.id === id);
  const basketItems = userBasket?.result.data.items;
  return (
    <>
      <ClientContainer>
        <section className="lg:mb-56 mb-10">
          {singleRestItem?.map((item) => {
            return (
              <div className="relative mb-10" key={item?.id}>
                <div
                  className={styles.bg}
                  style={{ backgroundImage: `url(${item?.img_url})` }}
                ></div>
                <div
                  className="flex justify-between items-center lg:flex-row flex-col  w-full px-4 pb-4 my-4"
                  style={{ borderBlockEnd: "2px solid #F2F2F2" }}
                >
                  <div className={styles["restaurant-title"]}>
                    <h2>
                      {item?.name}
                      {t(" Restaurant")}
                    </h2>
                    <span>{item?.address}</span>
                  </div>
                  <div className="flex items-center lg:w-auto w-full">
                    <div className={styles["restaurant-item"]}>
                      <h3>{t("Cuisine")}</h3>
                      <span>{item?.cuisine}</span>
                    </div>
                    <div className={styles["restaurant-buttons"]}>
                      <button>
                        ${item?.delivery_price} {t("Delivery")}
                      </button>
                      <button onClick={() => router.push("/restaurants")}>
                        {t("Go Back")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between gap-5">
            <RestaurantDetailLeft id={id} singleRestItem={singleRestItem} />
            <RestaurantDetailRight singleRestItem={singleRestItem} />
          </div>
          <div className="mx-auto mt-4 w-[90%]" style={{ bottom: "-10.5rem" }}>
            <div
              onClick={() => setIsBasketVisible(true)}
              className={styles["basket-checkout"]}
            >
              <span className={styles["checkout-text"]}>
                {basketItems?.length} {t("items")}
              </span>
              <div className={styles["checkout-bg"]}>
                $ {userBasket?.result.data.total_amount}
              </div>
            </div>
          </div>
          {isBasketVisible && (
            <>
              <div
                className={styles.overlay}
                onClick={() => setIsBasketVisible(false)}
              ></div>
              <div className={styles["basket-bg"]}>
                <>
                  {" "}
                  <div
                    className={styles.close}
                    onClick={() => setIsBasketVisible(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="34"
                        rx="17"
                        fill="white"
                        stroke="#BDBDBD"
                      />
                      <path
                        d="M25 12.41L23.59 11L18 16.59L12.41 11L11 12.41L16.59 18L11 23.59L12.41 25L18 19.41L23.59 25L25 23.59L19.41 18L25 12.41Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </div>
                  {basketItems?.length ? (
                    <>
                      <button
                        className={styles["clear-btn"]}
                        onClick={() =>
                          handleClearBasket(userBasket?.result?.data?.id)
                        }
                      >
                        Clear all
                      </button>
                      <div className="flex flex-col justify-between ">
                        <div className={styles["basket-middle"]}>
                          {basketItems?.map((basket) => (
                            <div
                              key={basket?.id}
                              className={styles["basket-card"]}
                            >
                              <div className="flex items-center">
                                <div className="mr-7 flex-shrink-0">
                                  <Image
                                    src={basket?.img_url}
                                    width={50}
                                    height={50}
                                    alt="food"
                                  />
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
                              <div className="flex">
                                <div className="flex flex-col mr-5 bg-[#F3F4F6] px-3 rounded-2xl">
                                  <button
                                    onClick={() =>
                                      increaseProductCount(basket?.id)
                                    }
                                  >
                                    +
                                  </button>
                                  <span className="font-bold">
                                    {basket?.count}
                                  </span>
                                  <button
                                    onClick={() =>
                                      decreaseProductCount(basket?.id)
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                                <div></div>
                              </div>
                            </div>
                          ))}
                          <div className="fixed bottom-2 mt-5 left-5 lg:hidden block w-[90%]">
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

                        <div className="absolute lg:block hidden bottom-0 left-5 w-[90%]">
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
                    </>
                  ) : (
                  <div className=" flex items-center flex-col justify-center h-[70%]"> 
                  <Image src={empty2} alt="img" width={180} height={180}></Image>
<div className="text-center text-2xl  text-red-500">Opps! <br /> Basket empty</div>
                  </div>
                  )}
                </>
              </div>
            </>
          )}
        </section>
      </ClientContainer>
    </>
  );
};

export default index;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
