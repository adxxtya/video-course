import React from 'react'
import Link from 'next/link';
import { cookies } from 'next/headers'
import { Button } from './ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Sidebar = async ({ children }) => {

  let user;

  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()

  if (data && data.session && data.session.user) {
    user = data?.session?.user;
  } else {
    console.error("User data not available");
  }

  return (
    <>
      <div className='w-full h-[8vh] text-xl flex justify-around items-center bg-gradient-to-r from-[#2478F5] via-[#214CA7] to-[#233476] text-white'>
        <div className='flex justify-evenly items-center h-full w-full'>
          <Link href="/" className='hover:underline'>Home</Link>
          <Link href="/courses" className='hover:underline'>Courses</Link>
          <Link href="/login" className='hover:underline'>Account</Link>
        </div>
        <div className='flex justify-center items-center h-full w-full'>
          {user ? (<>Welcome, {user.name || user.email}</>) : (<><Link href="/login"><Button className="p-6 px-12 bg-[#52D29D]">Get Started</Button></Link></>)}
        </div>
      </div>
      <main className='min-h-[92vh] h-auto bg-gradient-to-r from-[#2478F5] to-[#233476]'>{children}</main>
    </>
  )
}

export default Sidebar;
