import Image from 'next/image'
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
    </main>
  )
}
