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
import ProductCard from '@/components/productCard';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {


    fetch(`${url}/getProduct`, {
      method: "GET",
    }).then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(error => console.log(error));


  }, [])




  return (
    <main className='pt-20 min-h-screen w-full'>
      <Banner />

      <h1 className='text-center text-3xl my-10'>Our Awesome Collection for you</h1>
      <div>

        {
          loading ? <p className='text-center mb-5 text-2xl'>Loading....</p> : <div className='grid md:grid-cols-3 grid-cols-1 mb-10 md:px-24 px-4 place-content-center place-items-center'>
            {products.slice(0, 6).map(p => <ProductCard p={p} key={p._id}/>)}
          </div>

        }

        <div className='flex justify-center'>
          <Link className='border border-black px-3 py-2 rounded bg text-white hover:bg-violet-900' href='/products'>See all of our collection</Link>
        </div>

      </div>



      {/* Bushiness Summary */}

      <h1 className=' text-3xl text-center  mt-20'>At a Glance</h1>
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


      <h2 className="py-2  text-3xl text-center  my-24">What our clients say</h2>
      <div className="md:flex justify-between px-10 items-center bg-violet-200 py-10 ">
        <div className="md:w-1/2 flex md:justify-start justify-center ">
          <img src="review.jpeg" className='w-7/12 ' alt="" />

        </div>
        <div className="md:w-1/2 md:text-xl order-last mt-4 text-justify">
          <p>I recently had the pleasure of trying the Chocolate Fudge Cake and I must say, it was a delightful experience! The first thing that struck me was the rich aroma of chocolate as I opened the box, which made my mouth water with anticipation.

            The cake was beautifully decorated with a thick layer of chocolate frosting, topped with chocolate chips and drizzled with caramel sauce. The cake itself was moist and spongy, with a rich chocolate flavor that was not too overpowering. The frosting was smooth and velvety, and the chocolate chips added a nice crunch to every bite.

          </p>
          <p className="text-orange-500 font-semibold">Mohidul Islam</p><span>Faunder</span>
        </div>

      </div>
    </main>
  )
}
