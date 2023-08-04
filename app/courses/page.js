import React from 'react'
import Courses from "@/components/Courses"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async () => {

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
      <div className='w-full text-white'>
        <Courses User={user} />
      </div>
    </>
  )
}

export default Page


