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

  }, [])
  console.log(product)

  return (
    <div className='min-h-screen pt-20'>
    <img className='w-96 h-96' src={product.img} alt="" />
    
    </div>
  )
}

export default ProductDetails