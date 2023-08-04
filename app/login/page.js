import AccountForm from '@/components/AccountForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Login() {

  let user;

  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()

  if (data && data.session && data.session.user) {
    user = data?.session?.user;
  } else {
    console.error("User data not available");
  }

  return (
    <div className='container flex justify-center items-center h-[90vh]'>
      <AccountForm User={user} />
    </div>
  )
}