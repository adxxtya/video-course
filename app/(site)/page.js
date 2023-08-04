import { Button } from '@/components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const Hero = async ({
  listUser = [
    {
      name: "Courses",
      number: "100",
      icon: "/assets/Icon/heroicons_sm-user.svg",
    },
    {
      name: "Topics",
      number: "50",
      icon: "/assets/Icon/gridicons_location.svg",
    },
    {
      name: "Instructors",
      number: "30",
      icon: "/assets/Icon/bx_bxs-server.svg",
    },
  ],
}) => {

  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()


  return (
    <div
      className="max-w-screen-xl pt-24 px-8 xl:px-16 mx-auto text-white"
      id="about"
    >
      <div
        className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
      >
        <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
            Learn and Master with <strong>Intellify</strong>.
          </h1>
          <p className="text-black-500 mt-4 mb-6">
            Enhance your skills and knowledge with our wide range of video courses. Unlock your potential and excel in your career.
          </p>
          <Link href="/courses">
            <Button>Explore Courses</Button>
          </Link>
        </div>
        <div className="flex w-full rounded-lg">
          <div className="h-full w-full" >
            <Image
              src="/illustration.jpg"
              alt="Video Course Illustration"
              quality={100}
              width={612}
              height={383}
              className='rounded-lg'
            />
          </div>
        </div>
      </div>
      <div className="relative w-full flex">
        <div className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <Image src={listUsers.icon} className="h-6 w-6" width={25} height={25} alt="icon" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </div>
          ))}
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: "blur(114px)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;