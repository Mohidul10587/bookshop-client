
import { FiLoader } from 'react-icons/fi';

import { BsArrowRight } from 'react-icons/bs';
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import { useContext, useEffect, useState } from 'react'
import url from '@/components/url'
import Link from 'next/link'
import ProductCard from '@/components/productCard';
import Business from '@/components/summary';
import { ThemeContext } from './_app';
import { AiFillStar } from 'react-icons/ai';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mathematicsCollections, setMathematicsCollections] = useState([]);
  const [historyCollections, setHistoryCollections] = useState([]);
  const [scienceCollections, setScienceCollections] = useState([]);
  const [fictionCollections, setFictionCollections] = useState([]);
  const [biographyCollections, setBiographyCollections] = useState([]);

  const reviews = [
    {
      _id: 1,
      name: 'Emily Johnson',
      ratings: 3,
      review:'I recently purchased a novel from this online book shop and I was blown away by the quality of service! The book arrived in perfect condition and I was thrilled to start reading it. I highly recommend this book shop to any book lover out there!'
    },
    {
      _id: 3,
      name: 'Michael Davis',
      ratings: 5,
      review: 'I was looking for a specific book that was sold out in every local bookstore, but I found it on this online book shop and I could not be happier! The process of ordering was easy and the book arrived on time. I will definitely be a returning customer.'
    },
    {
      _id: 4,
      name: 'Sarah Thompson',
      ratings: 2,
      review: 'I have purchased several books from this online book shop and I have always been impressed with the selection and prices. The customer service is also fantastic and the staff is always willing to help with any questions or concerns. Highly recommend!'
    },
    {
      _id: 5,
      name: 'James Rodriguez',
      ratings: 4,
      review: 'I am so glad I stumbled upon this online book shop! The website is easy to navigate and there are so many great titles to choose from. The delivery was prompt and the books arrived in excellent condition. I will definitely be shopping here again.'
    }
  ]

  const icon = <p className='text-orange-500'><AiFillStar /></p>
  const value = useContext(ThemeContext);
  useEffect(() => {


    fetch(`${url}/getProduct`, {
      method: "GET",
    }).then(res => res.json())
      .then(data => {
        filterData(value.searchText, data)
        const mathematicsCollections = data.filter(d => d.categoryName === 'Mathematics');
        setMathematicsCollections(mathematicsCollections);
        const historyCollections = data.filter(d => d.categoryName === "History");
        setHistoryCollections(historyCollections);
        const scienceCollections = data.filter(d => d.categoryName === "Science");
        setScienceCollections(scienceCollections);
        const fictionCollections = data.filter(d => d.categoryName === "Fiction");
        setFictionCollections(fictionCollections);
        const biographyCollections = data.filter(d => d.categoryName === "Biography");
        setBiographyCollections(biographyCollections);
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

      <div className='mt-10 md:px-10'>

        <div className='grid md:grid-cols-3 grid-cols-1 text-2xl font-bold px-8 my-4'>
          <h1>Book Collection</h1>
        </div>

        {
          loading ?
            <div className='flex justify-center items-center gap-2 my-16 '>
              <FiLoader className='animate-spin text-2xl' />
              <p className='text-center text-2xl'>Loading....</p>
            </div> :
            <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-y-5 mb-10  md:px-4 place-content-center place-items-center'>
              {products.slice(0, 8).map(p => <ProductCard p={p} key={p._id} />)}
            </div>
        }
        <div className='flex justify-end text-xl font-bold px-4 my-4'>
          <Link href={`/products`}>
            <div className='flex items-center gap-2'> <h1>See all</h1>  <BsArrowRight /></div>
          </Link>
        </div>



      </div>



      {/* Bushiness Summary */}

      <Business />
      {/* <h2 className="py-2  text-3xl text-center  my-24">What our clients say</h2>
      <div className="md:flex justify-between px-10 items-center bg-violet-200 py-10 ">
        <div className="md:w-1/2 flex md:justify-start justify-center ">
          <img src="review.jpeg" className='w-7/12 ' alt="" />

        </div>
        <div className="md:w-1/2 md:text-xl order-last mt-4 text-justify">
          <p>I recently stumbled upon this online book shop and I must say I am thoroughly impressed! The website is user-friendly and easy to navigate, and the selection of books is fantastic. I was able to find a book I had been searching for months, and it was priced very reasonably.

            The checkout process was smooth and hassle-free, and my book arrived within a few days of ordering. The packaging was secure and the book was in excellent condition.


          </p>
          <p className="text-orange-500 font-semibold">John Abraham</p>
          <p className='text-orange-500 text-base'>CEO , NanoSoft tech ltd.</p>
        </div>

      </div> */}



      {/* review div start from here  */}
      <div id='review' className='md:px-16 px-4 py-24'>
        <h1 className='text-3xl  mb-4 text-center'>What our clients say</h1>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-16'>
          {reviews.slice(-4).map((r, index) => <div key={r._id} className='md:flex items-center p-2 border border-blue-600 mt-2 rounded-lg md:h-44 shadow-lg shadow-blue-500'>
            <div className='md:w-2/12 w-full mr-4 '>
              <img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" className='h-12 w-12 rounded-full border-blue-600 border-2' alt="" srcSet="" />
            </div>
            <div className='md:w-10/12 pr-4'>
              <div className='flex justify-between'>
                <p className='text-xl font-bold'> {r.name} </p>
                <div>
                  {r.ratings == 1 && <div className='flex'>{icon}</div>}
                  {r.ratings == 2 && <div className='flex'>{icon}{icon}</div>}
                  {r.ratings == 3 && <div className='flex'>{icon}{icon}{icon}</div>}
                  {r.ratings == 4 && <div className='flex'>{icon}{icon}{icon}{icon}</div>}
                  {r.ratings == 5 && <div className='flex'>{icon}{icon}{icon}{icon}{icon}</div>}
                </div>
              </div>
              <p className='text-justify'>{r.review.slice(0, 100)}{r.review.length > 101 && '.....'}</p>
              {r.review.length > 101 && <div>
                <p className='mt-2'>
                  <label htmlFor={`${index}`} className='border-[.5px] border-blue-600 rounded p-1 font-light'>Read More</label>
                </p>
                <input type="checkbox" id={`${index}`} className="modal-toggle" />
                <div className="modal md:mt-0 m-0">
                  <div className="modal-box m-0  p-2">
                    <div className='text-end m-0'>
                      <label className="border-2 border-blue-600 rounded-full  px-1 font-bold" htmlFor={`${index}`} >x</label></div>
                    <div className="modal-action p-0 flex justify-start">
                      <div className=' w-full  pb-4 px-4'>
                        <p className='text-justify'>{r.review}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>}
            </div>
          </div>)}
        </div>
      </div>





    </main>
  )
}