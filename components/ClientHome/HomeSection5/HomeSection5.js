import React, { useEffect } from 'react'
import styles from '../HomeSection3/homesection3.module.css'
import Image from 'next/image'
import foodImg3 from '../../../assets/images/foodImages/foodImg3.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeSection5 = () => {

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <section className='mb-44' data-aos="fade-left">
                <div className='flex items-start w-5/6 m-auto'>
                    <div className='w-3/4'>
                        <h3 className={styles.menu}>Do You Like French Fries? Mmm...</h3>
                        <p className={styles['menu-para']}>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </p>
                    </div>
                    <div className='ml-20'>
                        <Image src={foodImg3} alt='food-image' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSection5