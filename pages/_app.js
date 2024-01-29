'use client'
import React, { useEffect, useState } from 'react'
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css'
import { Roboto } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { BounceLoader } from 'react-spinners';

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      const isAvaibleToken = localStorage.getItem('refresh_token')
      if (isAvaibleToken) {
        return axios.post('/api/auth/refresh', { "refresh_token": isAvaibleToken })
          .then(response => {
            // Yeni access token alındıysa isteği tekrarla ve işlemi tamamla
            localStorage.setItem(response?.data.access_token)
            localStorage.setItem(response?.data.refresh_token)
            error.config.headers['Authorization'] = 'Bearer ' + response?.data.access_token;
            return axios.request(error.config);
          })
          .catch(err => {
            console.log(err);
            window.location.href = "/login";
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return Promise.reject();
          })
      }else{
        return
      }

    }
  }
);

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true);

  console.log(pathname.startsWith('/admin'));
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      document.body.classList.remove('my-custom-body');
      document.body.classList.add("my-custom-admin-body")
      setIsLoading(false)
    } else {
      document.body.classList.add('my-custom-body');
      document.body.classList.remove("my-custom-admin-body")
      setIsLoading(false)
    }
  }, [pathname])

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  if (isLoading) {
    return <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <BounceLoader
        color="#D63626"
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp);
