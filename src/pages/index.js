import Image from 'next/image'
import { FiFlag, FiHelpCircle, FiLoader } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { HiTemplate } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import { useContext, useEffect, useState } from 'react'
import url from '@/components/url'
import Link from 'next/link'
import ProductCard from '@/components/productCard';
import Business from '@/components/summary';
import { ThemeContext } from './_app';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [birthCollections, setBirthCollections] = useState([])
  const [momDayCollections, setMomDayCollections] = useState([])

  console.log(birthCollections)
  const value = useContext(ThemeContext);
  useEffect(() => {


    fetch(`${url}/getProduct`, {
      method: "GET",
    }).then(res => res.json())
      .then(data => {
        filterData(value.searchText, data)

        const birthDayCollections = data.filter(d => d.categoryName === 'Birthday cake')
        setBirthCollections(birthDayCollections)
        const momDayCollections = data.filter(d => d.categoryName === "Mothers' Day cake")
        setMomDayCollections(momDayCollections)

        setLoading(false)
      })
      .catch(error => console.log(error));


  }, [value.searchText])


  const filterData = (searchText, dataList) => {

    const lowercasedValue = searchText.toLowerCase().trim();
    if (lowercasedValue === "") setProducts(dataList);
    else {
      const filteredData = dataList.filter(
        (item) =>
          item.name.toLowerCase().trim().replace(/\s+/g, '').includes(lowercasedValue.replace(/\s+/g, ''))

      );
      console.log(filteredData.length)
      setProducts(filteredData);
    }
  }


  return (
    <main className='pt-20 min-h-screen w-full'>
      <Banner />

      {/* <h1 className='ml-4 text-3xl my-10'>Our Awesome Collection for you</h1> */}
      <div className='mt-10 md:px-10'>

        {/* {
          loading ?
            <div className='flex justify-center items-center gap-2 my-16 '>
              <FiLoader className='animate-spin text-2xl' />
              <p className='text-center text-2xl'>Loading....</p>

            </div> : <div className='grid md:grid-cols-4 grid-cols-1 gap-5  mb-10 md:px-24 px-4 place-content-center place-items-center'>
              {products.slice(0, 6).map(p => <ProductCard p={p} key={p._id} />)}
            </div>

        } */}
        <div className='grid md:grid-cols-4 grid-cols-1 text-2xl font-bold md:px-4 my-4'>
          <h1 >Birthday Collection</h1>
        </div>

        {
          loading ?
            <div className='flex justify-center items-center gap-2 my-16 '>
              <FiLoader className='animate-spin text-2xl' />
              <p className='text-center text-2xl'>Loading....</p>

            </div> : <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-y-5 mb-10  md:px-4 place-content-center place-items-center'>
              {birthCollections.slice(0, 4).map(p => <ProductCard p={p} key={p._id} />)}
            </div>

        }
        <div className='flex justify-end text-xl font-bold px-4 my-4'>
          <Link href={`/`}>
            <div className='flex items-center gap-2'> <h1> See all</h1>  <BsArrowRight /></div>
          </Link>
        </div>


        <div className='grid md:grid-cols-4 grid-cols-1 text-2xl font-bold px-4 my-4'>
          <h1>Mothers day Collection</h1>
        </div>

        {
          loading ?
            <div className='flex justify-center items-center gap-2 my-16 '>
              <FiLoader className='animate-spin text-2xl' />
              <p className='text-center text-2xl'>Loading....</p>

            </div> : <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-y-5 mb-10  md:px-4 place-content-center place-items-center'>
              {momDayCollections.slice(0, 4).map(p => <ProductCard p={p} key={p._id} />)}
            </div>

        }
        <div className='flex justify-end text-xl font-bold px-4 my-4'>
          <Link href={`/`}>
            <div className='flex items-center gap-2'> <h1> See all</h1>  <BsArrowRight /></div>
          </Link>
        </div>




      </div>



      {/* Bushiness Summary */}

      <Business />
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