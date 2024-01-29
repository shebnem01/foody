import React from 'react'
import style from '../AddResBtn/addresbtn.module.css'
import plusBtn from '../../../assets/icons/plusBtn.svg'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { openAddResModal } from '../../../redux/features/editModalSlice'
import { useTranslation } from 'next-i18next'

const AddResBtn = () => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()

    return (
        <>

            <div className='ml-5 max-md:ml-0'>
                <button onClick={() => dispatch(openAddResModal())} className={style['restaurant-btn']}>
                    <Image src={plusBtn} alt="plus-button" />
                    {t('ADD RESTAURANTS')}
                </button>
            </div>

        </>
    )
}

export default AddResBtn