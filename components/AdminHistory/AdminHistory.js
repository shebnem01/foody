import React from "react";
import styles from "../AdminCategory/admincategory.module.css";
import Image from "next/image";
import eye from "../../assets/icons/eye.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { openHisDelModal, showOrderHistoryModal, showOrderModal } from "../../redux/features/delModalSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import Cookies from "js-cookie";

const AdminHistory = () => {
  const dispatch = useDispatch()

  const { data: userOrderHistory, isLoading, isError } = useQuery({
    queryKey: ['order-history'],
    queryFn: async () => {
      const { data } = await axios.get('/api/order/history', {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessJWT')}`
        }
      })
      return data
    },
  })
  isError ? isError : ""
  const handleDate = (orderCreatedTime) => {
    const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [month, date, year] = new Date(orderCreatedTime).toLocaleDateString("en-US").split("/");
    return `${date > 9 && date !== 0 ? date : 0 + date} ${monthNames[month - 1]}  ${year}`
  }


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
  return (
    <>
      <section className="h-full">
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
              {userOrderHistory?.result.data.map((history, i) => (
                <tr className={styles["table-row"]} key={history?.id}>
                  <td>
                    <span className={styles["table-id"]}>{(history?.id).length > 4 && (history?.id).slice(0, 4)}</span>
                  </td>
                  <td>
                    <span className={styles["table-id"]}>{(history?.customer_id)?.length > 6 && (history?.customer_id).slice(0, 6)}</span>
                  </td>
                  <td>{handleDate(history?.created)}</td>
                  <td className="w-48 text-center">
                    {history?.delivery_address}
                  </td>
                  <td>{history?.amount}</td>
                  <td>{history?.payment_method === 1 ? "pay at the door by credit card" : "pay at the door"}</td>
                  <td>{history?.contact}</td>
                  <td className="mt-2 pr-3">
                    <button onClick={() => dispatch(showOrderHistoryModal(history?.id))}>
                      <Image src={eye} alt="trash-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminHistory;



