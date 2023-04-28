import { useForm } from 'react-hook-form';
import url from '@/components/url';
import React, { useEffect, useRef, useState } from 'react'



const UploadProducts = () => {
    const [fname, setFName] = useState("");
    const [file, setFile] = useState("");
    const [unit, setUnit] = useState('')
    const [priceOfUnit, setPriceOfUnit] = useState('')
    const [data, setData] = useState([])
    const [catName, setCatName] = useState([])

    const categoryNameRef = useRef();


    // useEffect(() => {


    //     fetch(`${url}/getCategoryName`, {
    //         method: 'GET',
    //         headers: {
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //     }).then(res => res.json()).then(data => {

    //         setData(data.data)
    //         setCatName(JSON.parse(data.data[0].subCategoryName))
    //     }
    //     )


    // }, [])

    const cakeFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Lemon', 'Carrot', 'Red velvet', 'Coconut', 'Pumpkin spice'];




    const setCategoryId = (e) => {
        const cName = data.find(d => d.categoryName === e)
        const sub = JSON.parse(cName.subCategoryName)
        setCatName(sub)
    }
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKey = '6c0277e2286d8c4a1059080d1574e2a7'


    const onSubmit = async data => {

        const image = data.photo[0]

        const formData = new FormData();
        formData.append('image', image)


        fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(result => {
                if (result.success) {

                    const imgUrl = result.data.url

                    fetch(`${url}/addProduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },

                        body: JSON.stringify({
                            name: data.name,
                            unit: data.unit,
                            price: data.price,
                            flavorName: data.flavorName,
                            description: data.description,
                            img: imgUrl,
                            email: "user.email"
                        })
                    })
                        .then(res => res.json())
                        .then((data) => {

                            if (data.acknowledged) {
                                toast.success('Your product added successfully')

                            } else {
                                toast.error('Sorry the product does not added. Please try again')
                            }

                        })
                }
            })

    }
    return (
        <>
            <div>
                <h1 className='text-center text-xl font-bold mb-3'>Create Category</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto  border-[1px] border-pink-400 p-4 rounded">
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Product Image</label>
                        <input type="file" id="photo" name="photo" className='border-2 p-2 border-black rounded w-full'{...register('photo')} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700 font-bold mb-2"> Product Name</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="fname" name="fname" {...register('name')} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2"> Cake Flavor</label>
                        <select className='border-2 p-3 border-black rounded w-full' type="text" id="categoryName" name="categoryName" {...register('flavorName')} ref={categoryNameRef}  >
                            {
                                cakeFlavors.map(d => <option value={d} key={d}> {d}</option>)
                            }
                        </select>
                    </div>

                    {/*       <div className="mb-4">
                        <label htmlFor="subCategoryName" className="block text-gray-700 font-bold mb-2">Sub Category Name</label>
                        <select className='border-2 p-2 border-black rounded w-full' type="text" id="subCategoryName" name="subCategoryName"  >
                            {
                                catName.map(d => <option value={d} key={d}> {d}</option>)
                            }

                        </select>
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="unit" className="block text-gray-700 font-bold mb-2"> Unit</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="unit" name="unit" {...register('unit')} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceOfUnit" className="block text-gray-700 font-bold mb-2">Price Of Unit</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="priceOfUnit" name="priceOfUnit"{...register('price')} required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Price Of Unit</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="description" name="description"{...register('description')} required />
                    </div>


                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default UploadProducts