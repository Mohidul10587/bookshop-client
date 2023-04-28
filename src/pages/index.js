import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import { useEffect, useState } from 'react'
import url from '@/components/url'
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

      <div className='grid grid-cols-4 gap-4'>
        {

          products.map(p =><div className='border border-black p-4 rounded-lg' key={p._id}>
              
              <img  className='w-full h-24 rounded-lg' src={p.img} alt={p.name} />
              <h2>{p.name}</h2>
      
              <p>Unit: {p.unit}</p>
              <p>Price: {p.price}</p>

            </div>
          )
        }

      </div>
    </main>
  )
}
