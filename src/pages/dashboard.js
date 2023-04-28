import { useState } from 'react';
import Link from 'next/link';



import UserManagement from './userManagement';
import AddProduct from './addProduct';

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('add-product');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  let pageContent;
  switch (activeLink) {
    case 'add-product':
      pageContent = <AddProduct />;
      break;
    case 'user-management':
      pageContent = <UserManagement />;
      break;

    default:
      pageContent = <AddProduct />;
  }

  return (
    <div className='flex pt-20 pb-4'>
      <div className='bg text-white px-4'>
       
        <ul>
          <li className='py-2'>
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('add-product')}>Add Products</p>
            </Link>
          </li>
          <li className='py-2'>
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('user-management')}>User Management</p>
            </Link>
          </li>

        </ul>
      </div>


      <div className='m-24 '>

        {pageContent}
      </div>
    </div>
  );
}
