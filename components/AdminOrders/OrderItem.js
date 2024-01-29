import React from "react";
import Image from "next/image";
import eye from "../../assets/icons/eye.svg";
import trashIcon from "../../assets/icons/trashIcon.svg";
import { useDispatch } from "react-redux";
import styles from "../AdminCategory/admincategory.module.css";
import { openOrderDelModal, showOrderModal } from "../../redux/features/delModalSlice";

const OrderItem = ({ orderData }) => {
  const orderResult = orderData?.result;
  const dispatch = useDispatch();
  const timestamps = orderResult?.data?.map((order) => order?.created);
  const formattedDates = timestamps?.map((timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  });

  return orderResult?.data?.map((order, i) => (
    <tr key={order?.id} className={styles["table-row"]}>
      <td>
        <span className={styles["table-id"]}>{(order?.id).length > 4 && (order?.id).slice(0,4)}</span>
      </td>
      <td>
        <span className={styles["table-id"]}>
          {order?.customer_id && order?.customer_id.slice(0, 7)}
        </span>
      </td>
      <td>
        <span className={styles["table-id"]}>{formattedDates[i]}</span>
      </td>
      <td className="w-48 text-center">{order?.delivery_address}</td>
      <td>${order?.amount}</td>
      <td>{order?.payment_method === 0 ? "pay at the door" : "pay at the door by credit card"}</td>
      <td>{order?.contact}</td>
      <td className="flex items-center mt-2">
        <button
          className="mr-4"
          onClick={() => dispatch(showOrderModal(order?.id))}
        >
          <Image src={eye} alt="edit-icon" />
        </button>
        <button onClick={() => dispatch(openOrderDelModal(order?.id))}>
          <Image src={trashIcon} alt="trash-icon" />
        </button>
      </td>
    </tr>
  ));
};

export default OrderItem;
