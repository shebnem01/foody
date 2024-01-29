import Image from 'next/image'
import React from 'react'
import ClientContainer from '../../components/common/ClientContainer/ClientContainer'
import error from '../../assets/images/error.svg'

const index = () => {
    return (
        <>
            <title>Page Not Found</title>
            <ClientContainer>
                <Image className='mt-4 mb-16 w-full' src={error} alt='error' />
            </ClientContainer>
        </>
    )
}

export default index