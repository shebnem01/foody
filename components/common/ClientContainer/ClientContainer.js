import React from 'react'
import ClientFooter from '../ClientFooter/ClientFooter'
import ClientHeader from '../ClientHeader/ClientHeader'

const ClientContainer = ({ children }) => {

  return (
    <div className='layout-client'>
      <div className='lg:mx-6 md:mx-4 mx-0'>
        <ClientHeader />
        {children}
      </div>
      <ClientFooter />
    </div>
  )
}

export default ClientContainer

