import React from 'react'
import ClientHome from '../../components/ClientHome/ClientHome'
import ClientContainer from '../../components/common/ClientContainer/ClientContainer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const index = () => {
    return (
        <>
            <ClientContainer>
                <ClientHome />
            </ClientContainer>
        </>
    )
}

export default index

export const getServerSideProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  });