import React from 'react'
import AdminDashboard from '../index'
import ProductContainer from '../../../components/Products/ProductsContainer'
import CategoryType from '../../../components/Products/CategoryType/CategoryType'
import ProductItems from '../../../components/Products/ProductItems/ProductItems'
import EditModal from '../../../components/common/EditModal/EditModal'
import DelModal from '../../../components/common/DelModal/DelModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

const Products = () => {
  const { t } = useTranslation('common')

  return (
    <AdminDashboard>
      <ProductContainer>
        <CategoryType pageName={t('Products')} />
        <ProductItems />
        <DelModal />
        <EditModal />
      </ProductContainer>
    </AdminDashboard>
  )
}

export default Products

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});