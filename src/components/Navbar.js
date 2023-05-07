
import Image from "next/image";
import Link from "next/link";
import jwt_decode from 'jwt-decode';
import { useContext } from "react";

import { AiOutlineUser, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { useRouter } from "next/router";
import url from "./url";
import { ThemeContext } from '../pages/_app';
const Navbar = () => {

  const value = useContext(ThemeContext);
  const router = useRouter();

  const cakeFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Lemon', 'Carrot', 'Red velvet', 'Coconut', 'Pumpkin spice'];


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
  fetchCartProducts();


 const handleChange = v => {
  value.setSearchText(v);
      // filterData(value);
    };




  return (


    <div className="shadow-gray-500 shadow-md bg   flex justify-between h-16  md:px-6 px-2 py-10 items-center fixed w-full  z-30">



      <div className="flex items-center  group/categories relative " >

        <p className=" md:mx-5 text-white hover:text-red-600  rounded-md md:px-3 border border-white px-1 py-1 font-bold md:text-base text-xs"> Flavours</p>
        <div className="hidden group-hover/categories:block absolute top-1 -left-2 text-white pt-14">
          <div className="bg text-white rounded p-2">
            {
              cakeFlavors.map(c => <Link onClick={()=>value.setSearchText('')}  key={c} href={`/category/${c}`}><p className=" hover:bg-white hover:text-black p-2 rounded">{c} </p></Link>)
            }
          </div>
        </div>


      <Link className="md:block hidden" href='/'>
        <div className="w-32  md:h-16 h-12 md:rounded-3xl overflow-hidden relative">

          <Image className="border border-black" src='/logo.png' fill alt='ok' />
        </div>
      </Link>
      </div>




      <div className="mx-2">
        <input
          value={value.searchText}
          placeholder="Search by Name "
          onChange={e => handleChange(e.target.value)}
          type="text"
          className="bg border rounded border-white text-white mr-2 py-1 px-2 w-full" /> 

      </div>

      <div className="flex items-center">

        <Link onClick={()=>value.setSearchText('')} className="" href='/'> <AiOutlineHome className="text-white rounded-full border border-white p-1 text-3xl md:mr-4 mr-1" /></Link>
        <Link href='/cart'> <AiOutlineShoppingCart className="text-white rounded-full border border-white p-1 text-3xl md:mr-4 mr-1" /></Link>

        <div className="group relative">
          <AiOutlineUser className="text-white rounded-full border border-white p-1 text-3xl" />
          <div className="group-hover:block hidden absolute pt-7 w-32 text-center -right-4 ease-in-out transition-all duration-700">
            <div className="bg text-white rounded p-2">
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='/profile'>Profile</Link>
              {value.admin && <Link className="block hover:bg-white hover:text-black p-2 rounded" href='/dashboard'>Dashboard</Link>}
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='/login'>Log In</Link>
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='/signUp'>Sign Up</Link>

              <p className="block hover:bg-white hover:text-black p-2 rounded" onClick={() => {
                localStorage.removeItem('token')
                value.setAdmin(false)
                router.push('/login')
              }}>Log Out</p>
            </div>
          </div>
        </div>
      </div>

    </div>


  );
};

export default Navbar;