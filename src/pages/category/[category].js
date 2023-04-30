import url from '@/components/url'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import handler from '../api/hello';

const Category = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const category = router.query.category


  useEffect(() => {
    if (category) {
      fetch(`${url}/productByFlavour/${category}`, {
        method: "GET",
      }).then(res => res.json())
        .then(data => {
          setProducts(data)
          setLoading(false)
        })
        .catch(error => console.log(error));
    }




  }, [category])


  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${url}/products/${productId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete product');
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };



  return (
    <div className='min-h-screen pt-24'>


      {
        loading ? <p className='text-center'>Loading....</p> :


          <div>



            {
              products.length === 0 ? <div className='flex justify-center items-center min-h-screen -mt-24'><p className='md:text-3xl text-xl px-5'>Opps ! No Cake for {category} flavour</p></div>
                :
                <div>
                  <h1 className='text-center md:text-3xl text-xl px-5'>{category} flavour</h1>
                  <div className='grid md:grid-cols-3 grid-cols-1 mb-10 md:px-24 px-4 place-content-center place-items-center'>

                    {products.map(p => (
                      <div className='border m-4 border-black w-72 rounded-lg overflow-hidden' key={p._id}>
                        <img className='w-72 h-72 rounded-t-lg' src={p.img} alt={p.name} />
                        <h2>{p.name}</h2>
                        <p>Price: {p.price}/ {p.unit}</p>
                        <Link href={`/productDetails/${p._id}`}>
                          <button className='w-72 p-2 bg hover:bg-violet-900 font-bold text-white'>Show Details</button>
                        </Link>
                      </div>
                    ))}

                  </div>
                </div>
            }

          </div>








      }

    </div>
  )
}

export default Category