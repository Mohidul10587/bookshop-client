import url from "@/components/url";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";



function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${url}/users`);
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div className=" min-h-screen mx-2 ">
      <div className="flex justify-between border border-black px-4">
        <p className=" py-2">Name & Email</p>
       
        
        <p className="py-2">Delete</p>


      </div>
      <div>
          {users?.map(user => (
            <div  key={user._id} className="flex justify-between items-center border border-black px-4">
              <p className="py-2">{user.name} <br/> {user.email}</p>
              
             
              {/* <p  onClick={()=>deleteProduct(user._id)} className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center h-7'><button  className=" px-1 py-1"><RiDeleteBin6Line /></button></p> */}
              <p   className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center h-7'><button  className=" px-1 py-1"><RiDeleteBin6Line /></button></p>
            </div>
          ))}
        </div>


    </div>
  );
}

export default UserManagement;
