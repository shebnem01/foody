import React from 'react'
import AdminDashboard from '../index'
import ProductContainer from '../../../components/Products/ProductsContainer'
import CategoryType from '../../../components/Products/CategoryType/CategoryType'
import AdminHistory from '../../../components/AdminHistory/AdminHistory'
import DelModal from '../../../components/common/DelModal/DelModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import ShowOrderHistoryModal from '../../../components/ShowOrderHistoryModal/ShowOrderHistoryModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const index = () => {
    const { t } = useTranslation('common')
    const { data, isLoading, error } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
          const accessToken = localStorage.getItem("access_token");
    
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          };
          const { data } = await axios.get("/api/order/history",{headers});
          return data;
        },
      });

    return (
        <>
            <AdminDashboard>
                <ProductContainer>
                    <CategoryType pageName={t('History')} />
                    <AdminHistory />
                    <ShowOrderHistoryModal orderHistory={...data} />
                    <DelModal />
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
