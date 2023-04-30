import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import url from '@/components/url';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/orderedProducts`).then((res) => res.json());
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className='min-h-screen flex justify-center items-center text-xl pt-20'><p> loading...</p></div>;

  return (
    <div className='min-h-screen  md:px-10 mx-2'>
      <div className=''>
        <h1 className='text-3xl mb-5'>All Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className='w-full'>

            <div className='flex justify-start   border border-black m-1'>

              <p className=' px-4 py-2 md:w-44 w-1/2  border border-r-black'>Customer Info</p>
              <p className=' px-4 py-2  md:w-96 w-1/2  text-center '>Ordered Product</p>
              <p className=' px-4 py-2 md:w-32 border  border-l-black md:block hidden'>Total Amount</p>

            </div>


            {orders.map((order) => (
              <div className='flex justify-start   border border-black m-1' key={order._id}>

                <div className=' px-4 py-2 md:w-44 w-1/2  border-r-black border  flex items-center'>
                  <p className=' '>
                    <span>Phone: {order.phoneNo}<br />  <span>Adress: {order.deliveryAddress}</span></span></p></div>


                <div className=''>
                  {order.cartProducts?.map((p) => <div className='md:flex gap-3 px-4 py-2 w-1/2  md:w-96 mb-1 items-center'>
                    <div className='w-12 h-12'>
                      <img src={p.img} className='w-full h-full  rounded-full' alt="" />
                    </div>
                    <p>{p.name}</p>

                  </div>)}

                </div>
                <div className=' px-4 py-2 md:w-32 border hidden border-l-black md:flex items-center'><p>{order.amount} tk</p></div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Orders;
