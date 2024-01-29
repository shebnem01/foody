import React from 'react'
import styles from '../RestaurantItem/restaurantitem.module.css'
import PapaJohns from '../../../assets/images/foodImages/PapaJohnsImg.svg'
import editImg from '../../../assets/icons/edit.svg';
import trashImg from '../../../assets/icons/trash.svg';
import { useDispatch, useSelector } from 'react-redux'
import { openResModalEdit } from '../../../redux/features/editModalSlice';
import { openResDelModal } from '../../../redux/features/delModalSlice'
import { motion } from "framer-motion";
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RestaurantItem = ({ restaurantsData }) => {
  const { data } = restaurantsData?.result
  const selActiveRestData = useSelector((state) => state.restaurant.isActiveRestData)
  const dispatch = useDispatch()
  const router = useRouter()

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    router.push(`/admin/restaurants`)
  }, [])

  const handleRestData = () => {
    if (selActiveRestData) {
      const filteredRestaurants = data?.filter((rest) => rest.category_id === selActiveRestData.id)
      return filteredRestaurants?.map((rest) => (
        <motion.div
          key={rest?.id}
          variants={item}
          className='flex items-center justify-between bg-white w-60 max-md:w-64 h-20 mr-9 mb-9 pl-3 pr-1 pb-2.5 pt-2 rounded-md max-[420px]:mr-0'
          id={styles['restaurant-card']}
        >
          <div>
            <Image src={rest?.img_url} width={50} height={50} alt="papa-johns" />
          </div>
          <div className={styles['restaurant-detail']}>
            <h3>{(rest?.name).length > 14 ? (rest?.name).slice(0,14) + "..." : rest?.name}</h3>
            <span>{rest?.cuisine}</span>
          </div>
          <div className='flex flex-col'>
            <button onClick={() => dispatch(openResDelModal(rest?.id))} className='mb-4'>
              <Image src={trashImg} className='w-6' alt="trash-button" />
            </button>
            <button onClick={() => dispatch(openResModalEdit(rest))}>
              <Image src={editImg} className='w-6' alt="edit-button" />
            </button>
          </div>
        </motion.div>
      ))
    } else {
      return data?.map((rest) => (
        <motion.div
          key={rest?.id}
          variants={item}
          className='flex items-center justify-between bg-white w-60 max-md:w-64 h-20 mr-9 mb-9 pl-3 pr-1 pb-2.5 pt-2 rounded-md max-[420px]:mr-0'
          id={styles['restaurant-card']}
        >
          <div>
            <Image src={rest?.img_url} width={50} height={50} alt="papa-johns" />
          </div>
          <div className={styles['restaurant-detail']}>
            <h3>{(rest?.name).length > 14 ? (rest?.name).slice(0,14) + "..." : rest?.name}</h3>
            <span>{(rest?.cuisine).length > 16 ? (rest?.cuisine).slice(0,16) + '...' : rest?.cuisine}</span>
          </div>
          <div className='flex flex-col'>
            <button onClick={() => dispatch(openResDelModal(rest?.id))} className='mb-4'>
              <Image src={trashImg} className='w-6' alt="trash-button" />
            </button>
            <button onClick={() => dispatch(openResModalEdit(rest))}>
              <Image src={editImg} className='w-6' alt="edit-button" />
            </button>
          </div>
        </motion.div>
      ))
    }
  }


  return (
    <>
      {
        handleRestData()
      }
    </>
  )
}

export default RestaurantItem