import url from '@/components/url';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ProductDetails = () => {
  const router = useRouter();
  const productId = router.query.productDetails
  const [product, setProduct] = useState({})



  useEffect(() => {

    fetch(`${url}/productDetails/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))

  }, [productId])
  console.log(product)

  return (
    <div className='min-h-screen pt-20 flex justify-between items-center px-10'>
      <img className='w-1/2' src={product.img} alt="" />

      <div className='w-1/2'>
        <h2 className='text-3xl'>{product.name}</h2>
        <p>Price: {product.price}/{product.unit}</p>
        <button className='border border-violet-900 rounded p-2'>Add to cart</button>
        </div>

    </div>
  )
}

export default ProductDetails