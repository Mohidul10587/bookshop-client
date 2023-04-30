import url from '@/components/url'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const AllProducts = () => {

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


    }, [products])


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
        <div className='px-2 min-h-screen pt-24'>
          <h1 className='text-center text-3xl'>All Of awesome collection for you</h1>
          
      <div className='grid md:grid-cols-3 grid-cols-1 mb-10 md:px-24 px-4 place-content-center place-items-center'>

                {products.map(p => (
                    <div className='border m-4 border-black w-80 rounded-lg overflow-hidden' key={p._id}>
                        <img className='w-80 h-80 rounded-t-lg' src={p.img} alt={p.name} />
                        <h2>{p.name}</h2>
                        <p>Price: {p.price}/ {p.unit}</p>
                        <Link href={`/productDetails/${p._id}`}>
                            <button className='w-80 p-2 bg hover:bg-violet-900 font-bold text-white'>Show Details</button>
                        </Link>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default AllProducts