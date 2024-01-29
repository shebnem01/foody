import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Image from 'next/image'
import eaImage from '../../assets/images/ea-image.svg'
import { BounceLoader } from 'react-spinners'
import RestaurantItem from './RestaurantItem/RestaurantItem'
import RestaurantItemsContainer from './RestaurantItemsContainer.js/RestaurantItemsContainer'

const RestaurantItems = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data } = await axios.get('/api/restuarants')
      return data
    },
  })

  if (isLoading) {
    return <div className='flex justify-center items-center mx-0 my-auto'>
      <BounceLoader
        color="#C74FEB"
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  }
  if (isError) return <div className='text-white'>error...</div>

  return (
    <>
      <RestaurantItemsContainer>
        <RestaurantItem restaurantsData={...data} />
      </RestaurantItemsContainer>
    </>
  )
}

export default RestaurantItems