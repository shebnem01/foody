'use client'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../AdminCategory/admincategory.module.css'
import axios from 'axios'
import OfferItem from './OfferItem'
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';

const AdminOffers = () => {
  // get offers
 
  const { data, isLoading, error } = useQuery({
    queryKey: ['offer'],
    queryFn: async () => {
        const { data } = await axios.get('/api/offer')
        return data
    },
})


    useEffect(() => {
        AOS.init()
    }, [])
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
      if (error) return <div className="text-white">error...</div>;
    return (
        <>
            <section className='h-full' data-aos="zoom-in">
                <div className={styles['table-container']}>
                    <table className={styles['table']}>
                        <thead className={styles['thead']}>
                            <tr className={styles['thead-row']}>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Descriptions</th>
                            </tr>
                        </thead>

                        <tbody className={styles['tbody']}>
                          <OfferItem offerData={...data}/>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default AdminOffers