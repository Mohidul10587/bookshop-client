import url from '@/components/url'
import React, { useEffect, useState } from 'react'
import {RiDeleteBin6Line} from 'react-icons/ri'

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
        <div className='px-2'>
            <div className='flex justify-between md:px-10 px-4 border py-4 border-black items-center'>
                <div className=''>
                    <p>Img</p>
                </div>
                <p>Name</p>
                <button>Del</button>
            </div>

            {products.map((p) => <div key={p._id} className='flex justify-between md:px-10 px-4 py-2 mb-2 items-center border border-black'>
                <div className='w-12 h-12'>
                    <img src={p.img} className='w-full h-full  rounded-full' alt="" />
                </div>
                <p>{p.name}</p>
                {/* <button><RiDeleteBin6Line /></button> */}


                <p  onClick={()=>deleteProduct(p._id)} className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center'><button  className=" px-1 py-1"><RiDeleteBin6Line /></button></p>



            </div>)}

        </div>
    )
}

export default AllProducts