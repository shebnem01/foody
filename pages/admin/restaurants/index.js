import React from 'react'
import AdminDashboard from '../index'
import ProductContainer from '../../../components/Products/ProductsContainer'
import ResCategoryType from '../../../components/Restaurants/ResCategoryType/ResCategoryType'
import RestaurantItems from '../../../components/Restaurants/RestaurantItems'
import EditModal from '../../../components/common/EditModal/EditModal'
import DelModal from '../../../components/common/DelModal/DelModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

const Restaurants = () => {
    const { t } = useTranslation('common')

    return (
        <AdminDashboard>
            <ProductContainer>
                <ResCategoryType pageName={t('Restaurants')} />
                <RestaurantItems />
                <DelModal />
                <EditModal />
            </ProductContainer>
        </AdminDashboard>
    )
}

export default Restaurants

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});