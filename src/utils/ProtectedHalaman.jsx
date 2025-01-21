import React from 'react'
import { Link } from 'react-router-dom'

const ProtectedHalaman = () => {
  return (
    <section className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='font-bold lg:text-8xl text-lg text-blue-700'>404</h1>
            <h3 className='text-sm'>Hanya admin yang dapat mengakses halaman ini</h3>
            <Link to="/login">
                <div className='p-2 px-4 bg-blue-700 text-white rounded-full'>
                    <p>Login</p>
                </div>
            </Link>
        </div>
    </section>
  )
}

export default ProtectedHalaman