import React, { useEffect } from "react";
import styles from "../common/DelModal/delmodal.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderModal } from "../../redux/features/delModalSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowOrderModal = () => {
  const { data: orderResult, isLoading, error } = useQuery({
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
  const dispatch = useDispatch();
  const selOrderModal = useSelector((state) => state.delModal.showOrderActive);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {selOrderModal && (
        <div>
          <div className={styles.overlay} data-aos="zoom-in">
            <div
              className="flex flex-col justify-center items-center text-center rounded absolute bg-white px-20"
              id={styles["modal-position"]}
              style={{
                width: "498px",
                height: "226px",
                boxShadow: "0px 3px 8px -2px rgba(0, 0, 0, 0.20)",
              }}
            >
              <span className={styles["modal-head"]}>Orders</span>
              {orderResult?.result.data?.map((item) => (
                <div key={item.id}>
                  <span className={styles["modal-para"]}>{item.name}</span>
                  {item.id === selOrderModal && (
                    <div>
                      <span>
                        {item.products
                          ?.map((product) => `${product?.count}x ${product?.name}` )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <div className="max-md:flex max-md:flex-col-reverse mt-4">
                <button
                  onClick={() => dispatch(closeOrderModal())}
                  className={styles["delete-btn"]}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowOrderModal;
