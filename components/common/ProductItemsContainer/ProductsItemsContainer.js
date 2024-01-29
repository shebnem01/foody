import React from 'react'
import { motion } from "framer-motion";

const ProductItemsContainer = ({ children }) => {

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className='flex max-md:justify-center max-md:ml-4 flex-wrap'>
                {children}
            </motion.div>
        </>
    )
}

export default ProductItemsContainer