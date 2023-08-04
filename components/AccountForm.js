'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export const dynamic = "force-dynamic";
export const revalidate = 0;

const AccountForm = ({ User }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('register')
  const [showMessage, setShowMessage] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSignUp = async (event) => {
    console.log("Signing up")
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async (event) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async (event) => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <>
      {User ? (
        <div className='flex flex-col gap-4 text-white'>
          <p>Hello {User.name || User.email}</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          {login == 'register' ? (<>
            <div className='w-1/2 flex flex-col  gap-4'>
              <label className='text-center text-white text-2xl'>Create Your Account</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleSignUp();
                  toast({
                    variant: "default",
                    title: "Successfully created your account!",
                    description: "Check your email for confirmation",
                  })
                  setLogin("login");
                  setShowMessage(true);
                }}
              >
                Register
              </button>
              <div className='flex mt-2 gap-x-2'>
                <p
                  className="text-white font-bold"
                >Already have an account?</p>
                <p
                  className="text-white font-bold hover:underline cursor-pointer"
                  onClick={() => setLogin("login")}
                >
                  Login
                </p>
              </div>
            </div>

          </>
          ) : (
            <>
              <div className='w-1/2 flex flex-col  gap-4' >
                <label className='text-center text-white text-2xl'>Log in to your Account</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSignIn}
                >
                  Login
                </button>
                {showMessage && <p className='text-center text-red-400'>(Make sure you have confirmed your email.)</p>}
                <div className='flex mt-2 gap-x-2'>
                  <p
                    className="text-white font-bold"
                  >Create your account today!</p>
                  <p
                    className="text-white font-bold hover:underline cursor-pointer"
                    onClick={() => setLogin("register")}
                  >
                    Register
                  </p>
                </div>
              </div>
            </>)}
        </>
      )}

    </>
  )
}

export default AccountForm