import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import url from '@/components/url';
import { ThemeContext } from './_app';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
const Login = () => {
  const value = useContext(ThemeContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      console.error(error);
    }

    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {

          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {

          return;
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());

        if (data.role) {

          value.setAdmin(true);

        } else {
          value.setAdmin(false);
        }
      } catch (err) {
        console.error(err);

      }
    };
    await fetchCartProducts();

  };

  return (
    <div className='min-h-screen pt-24 md:px-10 px-2'>
      <div className='flex justify-center'>
        <form className='border border-black md:w-1/2 p-10' onSubmit={handleLogin}>
          <p className='text-center text-3xl'>Login</p>
          {error && <p className='text-red-500'>{error}</p>}
          <p>Email</p>
          <input className='border border-black p-2 rounded-xl w-full' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <p>Password</p>
          <input className='border border-black p-2 rounded-xl w-full' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <input className='border border-black p-2 rounded-xl mt-4 w-full' type='submit' value='Login' />
        </form>

      </div>
      <div className='md:flex justify-center'>
        <div className='md:w-1/2 flex justify-between'>
          <Link href='forgotPassword'>Forget password ?</Link>
          <Link href='signUp'>Create account</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
