import React, { useEffect, useState } from 'react'
import Head from "next/head";
import NotFound404 from '../../assets/icons/405.gif'
import Image from 'next/image';
import Layout from '../../components/common/Layout'
import { store } from '../../redux/app/store'
import { Provider } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TanstackProvider from '../../providers/TanstackProvider'
import Cookies from 'js-cookie'
import { BounceLoader } from 'react-spinners'
import eaImage from '../../assets/images/ea-image.svg'

const AdminDashboard = ({ children }) => {
  const [cookie, setCookie] = useState(false)
  useEffect(() => {
    if (Cookies.get('accessJWT')) {
      setCookie(Cookies.get('accessJWT'))
    } else {
      setCookie('notfound')
    }
  }, [Cookies.get('accessJWT')])

  //   {!cookie?<div className='px-4' style={{ backgroundColor: '#1E1E30', 'min-height': '100vh' }}>
  //   <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
  // <BounceLoader
  //   color="#C74FEB"
  //   loading={true}
  //   size={70}
  //   aria-label="Loading Spinner"
  //   data-testid="loader"
  // />
  // </div>
  // </div>:
  return (
    <div>
      <Head>
        <title>Foody | Admin</title>
        <meta name="description" content="Foody" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!cookie ? <div className='px-4' style={{ backgroundColor: '#1E1E30', 'min-height': '100vh' }}>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <BounceLoader
            color="#C74FEB"
            loading={true}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div> : cookie === 'notfound' ? <Image className='h-screen w-screen' src={NotFound404} /> : <TanstackProvider>
        <Provider store={store}>
          <Layout>
            {children}
          </Layout>
          <div className='fixed left-4 bottom-8'>
            <Image src={eaImage} />
          </div>
        </Provider>
      </TanstackProvider>}
    </div>
  );
};

export default AdminDashboard;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }

});
