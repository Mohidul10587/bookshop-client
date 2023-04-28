import Image from 'next/image'
import { FiFlag } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { HiTemplate } from 'react-icons/hi';
import { CgDollar } from 'react-icons/cg';
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import { useEffect, useState } from 'react'
import url from '@/components/url'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products, setProducts] = useState([])


  useEffect(() => {


    fetch(`${url}/getProduct`, {
      method: "GET",
    }).then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .catch(error => console.log(error));


  }, [])
  console.log(products)

  return (
    <main className='pt-20 min-h-screen w-full'>
      <Banner className='pr-0 mr-0'></Banner>

<h1 className='text-center text-3xl my-10'>Our Awesome Collection for you</h1>
      <div className='grid grid-cols-3 gap-2 mb-10 px-24'>
        {

          products.map(p => <div className='border border-black w-80 rounded-lg overflow-hidden' key={p._id}>

            <img className='w-full h-72 rounded-t-lg' src={p.img} alt={p.name} />
            <h2>{p.name}</h2>


            <p>Price: {p.price}/ {p.unit}</p>




          <Link href={p._id}>  
          <button className='w-80 p-2 bg hover:bg-violet-900 font-bold text-white'>Show Details</button>

          </Link>
          
          </div>
          )
        }

      </div>



          {/* Bushiness Summary */}

          <h1 className='text-4xl font-bold text-center  mt-20'>At a Glance</h1>
      <div className='md:flex justify-between md:px-20 px-4 my-20'>
        <div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><FiFlag /></p>
            <p className='text-4xl mt-4 font-bold'>64</p>
            <p className='text-violet-900 font-bold'>Districts</p>
          </div>
        </div>
        <div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><FaUsers /></p>
            <p className='text-4xl mt-4 font-bold'>480+</p>
            <p className='text-violet-900 font-bold'>Satisfied Customer</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><AiFillLike /></p>
            <p className='text-4xl mt-4 font-bold'>380+</p>
            <p className='text-violet-900 font-bold'>Feedback</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><HiTemplate /></p>
            <p className='text-4xl mt-4 font-bold'>24+</p>
            <p className='text-violet-900 font-bold'>Items</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><CgDollar /></p>
            <p className='text-4xl mt-4 font-bold'>800K$+</p>
            <p className='text-violet-900 font-bold'>Revenues</p>
          </div>
        </div>

      </div>
    </main>
  )
}
