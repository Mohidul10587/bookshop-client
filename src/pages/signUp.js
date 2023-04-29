import React, { useState } from 'react';
import { useRouter } from 'next/router';
import url from '@/components/url';

const Signup = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const { token } = await response.json();
    localStorage.setItem('token', token);
    router.push('/');
  };

  return (
    <div className='min-h-screen pt-24 px-10'>
        <div className='flex justify-center'>
     <form onSubmit={handleFormSubmit} className='border border-black w-1/2 p-10'>
        <p className='text-center text-3xl'>Sign Up</p>
        <p>Name</p>
        <input name='name' value={userData.name} onChange={handleInputChange} className='border border-black p-2 rounded-xl w-full' type='text' />
        <p>Email</p>
        <input name='email' value={userData.email} onChange={handleInputChange} className='border border-black p-2 rounded-xl w-full' type='email' />
        <p>Password</p>
        <input name='password' value={userData.password} onChange={handleInputChange} className='border border-black p-2 rounded-xl w-full' type='password' />
        <br />
        <input className='border border-black p-2 rounded-xl mt-4 w-full' type='submit' value='Sign Up' />
      </form>
     </div>
    </div>
  );
};

export default Signup;
