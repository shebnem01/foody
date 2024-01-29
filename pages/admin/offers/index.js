import React from 'react'
import AdminDashboard from '../index'
import ProductContainer from '../../../components/Products/ProductsContainer'
import AdminOffers from '../../../components/AdminOffers/AdminOffers'
import EditModal from '../../../components/common/EditModal/EditModal'
import DelModal from '../../../components/common/DelModal/DelModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import OffersType from '../../../components/common/Offers/OffersType'

const index = () => {
  const { t } = useTranslation('common')
  
  return (
    <>
      <AdminDashboard>
        <ProductContainer>
          <OffersType pageName={t('Offers')} />
          <AdminOffers />
          <DelModal />
          <EditModal />
        </ProductContainer>
      </AdminDashboard>
    </>
  )
}

export default index

export const getServerSideProps = async ({ locale }) => ({
  props: {
      ...(await serverSideTranslations(locale, ['common']))
  }

});
