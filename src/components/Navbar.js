
import Image from "next/image";
import Link from "next/link";
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from "react";
import { RxCross2 } from 'react-icons/rx'
import { GoThreeBars } from 'react-icons/go'
import { AiOutlineUser, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { useRouter } from "next/router";
import url from "./url";
import { ThemeContext } from '../pages/_app';
const Navbar = () => {

  const value = useContext(ThemeContext);
  const router = useRouter();
  const [dropdown, setDropdown] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [toggleCross, setToogleCross] = useState(false)
  const [loading, setLoading] = useState(true);
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

      }else{
        value.setAdmin(false);
      }
    } catch (err) {
      console.error(err);

    }
  };
  fetchCartProducts();




  return (


    <div className="shadow-gray-500 shadow-md bg   flex justify-between h-16  px-6 py-10 items-center fixed w-full  z-30">
      <Link href='/'>  <div className="w-24 h-16 rounded-3xl overflow-hidden relative">

        <Image className="border border-black" src='/logo.png' fill alt='ok' />
      </div></Link>

      {/* menu for md device */}
      <div className="md:flex items-center hidden group/categories relative " >

        {/* <Link className="mx-5 text-white hover:text-red-600 duration-700 rounded-md px-3" href='/about'> Cake Flavours</Link> */}
        <p className=" mx-5 text-white hover:text-red-600 duration-700 rounded-md px-3"> Cake Flavours</p>
        <div className="hidden group-hover/categories:block absolute top-0 text-white pt-14">
          <div className="bg text-white rounded p-2">
            {
              cakeFlavors.map(c => <p key={c} className=" hover:bg-white hover:text-black p-2 rounded">{c}</p>)
            }


          </div>
        </div>



      </div>




      <div className="flex items-center">
        <Link href='/'> <AiOutlineHome className="text-white rounded-full border border-white p-1 text-3xl mr-4" /></Link>
        <Link href='/cart'> <AiOutlineShoppingCart className="text-white rounded-full border border-white p-1 text-3xl mr-4" /></Link>

        <div className="group relative">
          <AiOutlineUser className="text-white rounded-full border border-white p-1 text-3xl" />
          <div className="group-hover:block hidden absolute pt-7 w-32 text-center -right-4 ease-in-out transition-all duration-700">
            <div className="bg text-white rounded p-2">
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='profile'>Profile</Link>
              { value.admin && <Link className="block hover:bg-white hover:text-black p-2 rounded" href='dashboard'>Dashboard</Link>}
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='login'>Log In</Link>
              <Link className="block hover:bg-white hover:text-black p-2 rounded" href='signUp'>Sign Up</Link>

              <p className="block hover:bg-white hover:text-black p-2 rounded">Log Out</p>
            </div>
          </div>
        </div>
      </div>

   

      <GoThreeBars className={toggleCross ? "hidden bg-white text-black rounded-full p-1 text-4xl" : "md:hidden  bg-white text-black rounded-full p-1 text-4xl"}
        onClick={() => {

          setDropdown(!dropdown)
          setToogleCross(true)

        }} />
      <RxCross2 className={toggleCross ? "md:hidden bg-white text-black rounded-full p-1 text-4xl" : "hidden  bg-white text-black rounded-full p-1 text-4xl"}
        onClick={() => {

          setDropdown(true)
          setToogleCross(false)

        }} />


      <div onClick={() => {
        setDropdown(true)
        setToogleCross(false)
      }} className={dropdown ? 'rounded-b bg  md:hidden fixed top-20 w-64   z-30 -left-64 transition-all duration-700' : ' bg text-red-600 md:hidden fixed top-20 w-64 left-0  z-30 transition-all duration-700 rounded-b'} >

        <Link href='/'>  <p className=" border  px-2 py-1 mx-2 rounded my-3 ">Home</p></Link>
        <Link href='about'><p className=" border  px-2 py-1 mx-2 rounded my-3 ">About Us</p></Link>
        <Link href='contact'><p className=" border  px-2 py-1 mx-2 rounded my-3 ">Contact</p></Link>
        <Link href='service'><p className=" border  px-2 py-1 mx-2 rounded my-3 ">Services</p></Link>
        <Link href='blogs'><p className=" border  px-2 py-1 mx-2 rounded my-3 ">Blogs</p></Link>
        {/* <Link href='#'><p className=" border  px-2 py-1 mx-2 rounded my-3 ">Log In</p></Link> */}

      </div>
    </div>


  );
};

export default Navbar;
