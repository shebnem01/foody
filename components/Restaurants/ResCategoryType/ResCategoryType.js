import React from 'react'
import styles from '../../Products/CategoryType/categorytype.module.css'
import styles2 from '../ResCategoryType/rescategorytype.module.css'
import ResSelectBox from '../ResSelectBox/ResSelectBox'
import AddResBtn from '../AddResBtn/AddResBtn'
import EditRestCategoryBox from '../../common/EditRestCategoryBox/EditRestCategoryBox'
const ResCategoryType = ({ pageName }) => {
    return (
        <>
            <div className={`${styles['category-type-bg']} ${styles2['category-type-bg']}`}>
                <div className='flex max-md:flex-col justify-between items-center py-5 px-7 max-md:px-5 max-md:items-start'>
                    <div className='max-md:mb-4'>
                        <h2 className={styles['products-head-text']}>{pageName}</h2>
                    </div>
                    <div className='flex items-center max-md:flex-col max-md:items-center'>
                        <EditRestCategoryBox />
                        <AddResBtn />
                    </div>

                </div>

            </div>
        </>
    )
}

export default ResCategoryType