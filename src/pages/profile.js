import React from 'react'

const Profile = () => {
  return (
    <div className='min-h-screen pt-20 '>
      <div className='h-44 w-full relative'>
        <img src="/profilebg.jpg" className='h-full w-full' alt="" />
        <img src="/review.jpeg" className='h-24 w-24 left-4 rounded-full border border-black absolute -bottom-10' alt="" />
      </div>

      <div className='mt-10 ml-4'>
        <p>Name : Mr Xyz</p>
        <p>Email : demo@gmail.com</p>
      </div>


    </div>
  )
}

export default Profile