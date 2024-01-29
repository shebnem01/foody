import React from 'react'

const ProductContainer = ({ children }) => {
    return (
        <>
            <div className='flex flex-col max-md:mx-3 md:ml-7 w-full'>
                {children}
            </div>
        </>
    )
}

export default ProductContainer