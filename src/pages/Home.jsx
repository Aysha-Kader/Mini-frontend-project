import React from 'react'
import {FaUserCircle,FaGlobe,FaHeart} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

const Home = () => {
const navigate=useNavigate();
  return (
    <div className=' lg:overflow-hidden '>
    <div className=' md:py-20 py-5  grid grid-cols-1 md:grid-cols-2   justify-center items-center gap-3'>
        <div className='flex flex-col justify-center items-center gap-8 text-center'>
            <div className='text-3xl md:text-6xl font-extrabold'>Adventure of <br></br><span className='text-yellow-400'>Delicacies</span></div>
            <div className="text-gray-400 font-md ">"Discover and share your favorite recipes with a passionate community of home cooks. From quick weeknight dinners to show-stopping desserts, find culinary inspiration and share your own kitchen triumphs."</div>
            <div className='flex gap-4 lg:pt-15 pt-5'><button className='bg-black rounded-lg text-white p-2  cursor-pointer  hover:scale-105'>Explore recepies</button>
            <button className='bg-white border-2 rounded-lg p-2 cursor-pointer hover:bg-100 transition transform  hover-scale-125'  onClick={() => navigate("/about")}>About us</button></div>
        </div>
         <div className='  justify-center items-center hidden md:flex'>
            
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhP9WmtXkV3bd4bkcbIMiXUM5PcB6m38n3w&s' className='w-100 h-60 rounded-lg'/>
 

</div>
</div>
<div className='px-2 md:px-4 '> 
 <div className='bg-gray-200 grid grid-cols-1 md:grid-cols-3  p-3 gap-2 md:gap-4 rounded-lg w-screen '>
  <div className='gap-3 flex flex-col p-2  gap-3'>
    <div> <FaUserCircle size={20}/> </div>
    <div className='font-semibold'>User-Centered</div>
    <p className='text-gray-500'>Your feedback shapes our platform,ensuring a seamless and satisfying culinary journey.</p>

  </div>
   <div className='gap-3 flex flex-col p-2 gap-3'>
    <div><FaGlobe size={20}/> </div>
    <div className='font-semibold'>Diverse  Recipies</div>
    <p className='text-gray-500'> We celebrate diverse culinary traditions from around the world,inspiring you today.</p>

  </div>
   <div className='gap-3 flex flex-col p-2  gap-3'>
    <div> <FaHeart size={20}/> </div>
    <div className='font-semibold'>Fun Community</div>
    <p className='text-gray-500'>We foster a vibrant foodie community where joy <br></br>comes with sharing recipies.</p>

  </div>
</div>
</div>

   </div>
  )
}

export default Home