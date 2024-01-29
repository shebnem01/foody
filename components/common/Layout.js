'use client'
import React from 'react'
import Header from '../common/Header/Header'
import Navbar from '../common/Navbar/Navbar'
import EditModal from './EditModal/EditModal'
import Dashboard from '../Dashboard/Dashboard'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const pathname = usePathname()
    return (
        <>
            <div className='px-4 layout-admin' style={{ backgroundColor: '#1E1E30', 'min-height': '100vh' }}>
                <Header />
                <main className='flex'>
                    <Navbar />
                    {pathname === '/admin' &&
                        <Dashboard />
                    }
                    <EditModal />
                    {children}
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </main>
            </div>
        </>
    )
}

export default Layout