import url from '@/components/url'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '@/components/productCard'
import { ThemeContext } from '../_app'
import { FiLoader } from 'react-icons/fi'



const Category = () => {
  const cakeFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Lemon', 'Carrot', 'Red velvet', 'Coconut', 'Pumpkin spice'];
  const priceRanges = ["100-500", "500-1000","1000-1500","1500-2000"];

  const [products, setProducts] = useState([])
  const [showFlavour, setShowFlavour] = useState(false)
  const [showPrice, setShowPrice] = useState(false)

  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const category = router.query.type
  const value = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    flavour: [],
    price:[]
  });

  const handleFlavorsFilter = (event) => {
    const flavour = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setFilters({
        ...filters,
        flavour: [...filters?.flavour, flavour],
      });
    } else {
      setFilters({
        ...filters,
        flavour: filters?.flavour.filter(b => b !== flavour),
      });
    }
  };

  const handlePriceFilter = (event) => {
    const priceRange = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setFilters((filters) => ({
        ...filters,
        price: [...filters?.price, priceRange],
      }));
    } else {
      setFilters((filters) => ({
        ...filters,
        price: filters?.price.filter((p) => p !== priceRange),
      }));
    }
  };
  
  console.log(filters?.price)

  const filteredProducts = products.filter(product => {
    if (filters?.flavour.length > 0 && !filters?.flavour.includes(product.flavorName)) {
      return false;
    }
    if (filters?.price.length > 0) {
      const productPrice = parseInt(product.price);
      console.log(productPrice)
      const selectedPriceRanges = filters?.price.map(p => p.split('-'));
      console.log(selectedPriceRanges)
      const isPriceMatch = selectedPriceRanges.some(
        ([min, max]) => (min === '' || productPrice >= min) && (max === '' || productPrice <= max)
      );
      if (!isPriceMatch) {
        return false;
      }
    }
    return true;
  });


  useEffect(() => {
    if (category) {
      fetch(`${url}/cakeType/${category}`, {
        method: "GET",
      }).then(res => res.json())
        .then(data => {
          filterData(value.searchText, data)
          setLoading(false)
        })
        .catch(error => console.log(error));
    }
  }, [value.searchText, category])


  const filterData = (searchText, dataList, filters) => {
    const lowercasedValue = searchText.toLowerCase().trim();
    let filteredData = dataList;
    if (lowercasedValue !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().trim().replace(/\s+/g, '').includes(lowercasedValue.replace(/\s+/g, ''))
      );
    }
    if (filters?.flavour.length > 0) {
      filteredData = filteredData.filter(
        (item) => filters?.flavour.includes(item.flavorName)
      );
    }
    if (filters?.price.length > 0) {
      const selectedPriceRanges = filters?.price.map((p) => p.split('-'));
      filteredData = filteredData.filter(
        (item) =>
          selectedPriceRanges.some(
            ([min, max]) =>
              (min === '' || parseInt(item.price) >= parseInt(min)) &&
              (max === '' || parseInt(item.price) <= parseInt(max))
          )
      );
    }
    setProducts(filteredData);
  };
  

  if (loading) return <div className='min-h-screen pt-24 flex justify-center items-center gap-2'>
    <FiLoader className='animate-spin text-2xl' />
    <p className='text-center text-2xl'>Loading....</p>
  </div>

  return (
    <div className='min-h-screen pt-24'>

      <div className='px-10'>
        <h1 className='text-center md:text-3xl text-xl px-5'>{category}</h1>
        <div className='flex  md:mt-10 mt-4 '>

          <div className='border border-black w-1/4 px-2'>
            <h1 className="text-2xl font-bold mt-4">Product Filter</h1>
            <div className=" mt-4">


              <div className="flavour-container cursor-pointer">
                <div onClick={() => setShowFlavour(!showFlavour)} className="text-lg mb-2 flex justify-between items-center">
                  <p>Filter with Flavour</p>
                  {showFlavour ? <p className='text-3xl'>-</p> : <p className='text-3xl'>+</p>}
                </div>
                <div className={`flavour-checkboxes ${showFlavour ? 'open' : ''}`}>
                  {cakeFlavors.map(c =>
                    <label className="flex items-center mb-1">
                      <input type="checkbox" value={c} onChange={handleFlavorsFilter} />
                      <span className="ml-2">{c}</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="flavour-container cursor-pointer">
                <div onClick={() => setShowPrice(!showPrice)} className="text-lg mb-2 flex justify-between items-center">
                  <p>Filter with price</p>
                  {showPrice ? <p className='text-3xl'>-</p> : <p className='text-3xl'>+</p>}
                </div>
                <div className={`flavour-checkboxes ${showPrice ? 'open' : ''}`}>
                  {priceRanges.map(c =>
                    <label className="flex items-center mb-1">
                      <input type="checkbox" value={c} onChange={handlePriceFilter} />
                      <span className="ml-2">{c}</span>
                    </label>
                  )}
                </div>
              </div>


            </div>




          </div>

          <div className='w-3/4'>

            {products.length > 0 ? (
              <div className='grid md:grid-cols-3 grid-cols-1 gap-5 mb-10  px-4 place-content-center place-items-center'>

                {filteredProducts.map(p => <ProductCard p={p} key={p._id} />)}
              </div>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>

    </div>

  )
}

export default Category