"use client"

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import courses from "@/controllers/course_list.json"
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Courses = ({ User }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  function getYouTubeVideoID(link) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/|.*[\\\/]videos\/))([^?&\\\/]+)/;
    const match = link.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='text-3xl p-4 pl-16 pt-12'>
          Checkout all the courses
        </div>
        <div className='flex justify-center items-center gap-4 p-4 pr-16 pt-12'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search for courses...'
            className='px-20 py-4 bg-slate-200 text-slate-800 rounded-lg focus:outline-none'
          />
        </div>
      </div>
      <div className='container w-full flex flex-wrap gap-4 p-2'>
        {filteredCourses.map((course) => (
          <div key={course.id} className='flex flex-col justify-center items-center bg-slate-100 rounded-lg gap-4 p-2 h-auto text-black w-full sm:w-auto'>
            <Sheet>
              <SheetTrigger>
                <div>
                  <Image src={course.image_link} alt="Course Thumbnail" width={150} height={150} className='w-auto rounded-lg' />
                  <p className='text-lg mt-4'>
                    {course.course_name}
                  </p>
                </div>
              </SheetTrigger>
              <SheetContent className="bg-slate-50 h-auto" side="bottom">
                <div className='w-full h-full mt-6'>
                  <div className='w-full flex h-full '>
                    <Image src={course.image_link} alt="Course Thumbnail" width={150} height={150} className='w-3/12 rounded-lg' />
                    <div className='flex flex-col h-full ml-8 justify-center gap-y-3'>
                      <h1 className='text-4xl font-bold'>
                        {course.course_name}
                      </h1>
                      <p className='text-xl text-neutral-500'>
                        <span className='text-neutral-600'>
                          Description: {" "}
                        </span>
                        {course.description}</p>
                      <p className='text-xl text-neutral-500'>
                        <span className='text-neutral-600'>
                          Type: {" "}
                        </span>
                        {course.course_type === "free" ? "Free" : "Premium"}
                      </p>
                      <p className='text-xl text-neutral-500'>

                        {User ? "You are a Premium Member! Enjoy the Course!" : "You must be a Premium Member to be able to watch this course"}
                      </p>
                    </div>
                  </div>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-3xl font-medium mt-3 mb-2 text-center'>This course contains:</h1>
                    <div className='relative flex gap-4 overscroll-x-auto w-auto p-8'>
                      {course.video_links.map((link) => (
                        <div key={link} className='flex '>
                          <iframe
                            width="320"
                            height="180"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoID(link)}`}
                            title="YouTube video player"
                            allowFullScreen
                            className='relative'
                          />
                          {course.course_type === "premium" &&
                            (
                              !User ? (<div className='absolute top-0 left-0 bg-slate-800 opacity-50 rounded-lg w-full h-full z-[99] flex flex-col justify-center items-center'>
                                <h1 className='text-xl text-white mb-4'>You've stumbled across Premium Content!</h1>
                                <Image src="/file-lock-icon.svg" width={100} height={100} alt='Locked' />
                              </div>) : null

                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ))}
      </div>
    </>
  )
}

export default Courses