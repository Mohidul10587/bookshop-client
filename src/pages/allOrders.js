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

  if (loading) return <p className='min-h-screen pt-20'> loading...</p>;

  return (
    <div className='min-h-screen md:pt-24 md:px-10 mx-2'>
      <div className='text-center'>
        <h1 className='text-3xl mb-5'>All Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className='w-full'>
            <thead>
              <tr>
        
                <th className='border border-black px-4 py-2'>Date</th>
                <th className='border border-black px-4 py-2'>Customer Info</th>
                <th className='border border-black px-4 py-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                
                  <td className='border border-black px-4 py-2'>{new Date(order.date).toLocaleDateString()}</td>
                  <td className='border border-black px-4 py-2'><span>{order.email}</span> <br/>
                    <span>Phone:{order.phoneNo}<br/>  <span>Adress: {order.deliveryAddress}</span></span></td>
                  <td className='border border-black px-4 py-2'>
                    <span> {order.cartProducts?.length}</span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
