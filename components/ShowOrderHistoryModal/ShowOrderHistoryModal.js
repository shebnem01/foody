import React, { useEffect } from "react";
import styles from "../common/DelModal/delmodal.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderHistoryModal, closeOrderModal } from "../../redux/features/delModalSlice";

const ShowOrderHistoryModal = ({ orderHistory }) => {
  const orderResult = orderHistory?.result;

  const dispatch = useDispatch();
  const selOrderHistoryModal = useSelector((state) => state.delModal.showOrderHistoryModal);
  console.log(orderResult);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {selOrderHistoryModal && (
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
              <span className={styles["modal-head"]}>History</span>
              {orderResult?.data?.map((item) => (
                <div key={item.id}>
                  <span className={styles["modal-para"]}>{item.name}</span>
                  {item.id === selOrderHistoryModal && (
                    <div>
                      <span>
                        {item.products
                          ?.map((product) => `${product?.count}x ${product?.name}`)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <div className="max-md:flex max-md:flex-col-reverse mt-4">
                <button
                  onClick={() => dispatch(closeOrderHistoryModal())}
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

export default ShowOrderHistoryModal;
