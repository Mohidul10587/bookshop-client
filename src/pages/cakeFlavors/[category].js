import url from '@/components/url'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import handler from '../api/hello';
import ProductCard from '@/components/productCard'
import { ThemeContext } from '../_app'
import { FiLoader } from 'react-icons/fi'


const Category = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const category = router.query.category
  const value = useContext(ThemeContext);

  useEffect(() => {
    if (category) {
      fetch(`${url}/productByFlavour/${category}`, {
        method: "GET",
      }).then(res => res.json())
        .then(data => {
          filterData(value.searchText, data)
          setLoading(false)
        })
        .catch(error => console.log(error));
    }




  }, [value.searchText, category])


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

  if (loading) return <div className='min-h-screen pt-24 flex justify-center items-center gap-2'>
    <FiLoader className='animate-spin text-2xl' />
    <p className='text-center text-2xl'>Loading....</p>
  </div>

  return (
    <div className='min-h-screen pt-24'>

      {
        loading ? <p className='text-center'>Loading....</p> :

          <div>

            {
              products.length === 0 ? <div className='flex justify-center items-center min-h-screen -mt-24'><p className='md:text-3xl text-xl px-5'>Opps ! No Cake for {category} flavour</p></div>
                :
                <div className='px-10'>
                  <h1 className='text-center md:text-3xl text-xl px-5'>{category} flavour</h1>
                  <div className='grid md:grid-cols-4 grid-cols-1 gap-5  mb-10  px-4 place-content-center place-items-center'>
                    {products.map(p => <ProductCard p={p} key={p._id} />)}
                  </div>
                </div>
            }

          </div>

      }

    </div>
  )
}

export default Category