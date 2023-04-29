import { useState, useEffect } from 'react';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

import UserManagement from './userManagement';
import AddProduct from './addProduct';
import Orders from './allOrders';
import url from '@/components/url';



export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('add-product');
  const [email, setEmail] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const { email } = await res.json();
        setEmail(email)
        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());
        if (data.role) {
          setLoading(false);

        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };


    fetchCartProducts();
  }, []);

  let pageContent;
  switch (activeLink) {
    case 'add-product':
      pageContent = <AddProduct />;
      break;
    case 'user-management':
      pageContent = <UserManagement />;
      break;
    case 'all-orders':
      pageContent = <Orders />;
      break;
    default:
      pageContent = <AddProduct />;
  }


  if (loading) return <p className='min-h-screen pt-20'> loading...</p>



  return (
    <div className="flex pt-20 pb-4">
      <div className="bg text-white px-4 md:w-2/12 hidden md:block">
        <ul className='mt-4'>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('add-product')}>Add Products</p>
            </Link>
          </li>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('user-management')}>User Management</p>
            </Link>
          </li>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('all-orders')}>All Orders</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-4 md:w-10/12">

      
          {pageContent}
      

      </div>
    </div>
  );
}
