import React from 'react'

const Home = () => {
  return (
    <div className='px-5 md:py-20 py-5 bg-grey-100 grid grid-cols-1 md:grid-cols-2 w-screen justify-center items-center gap-3'>
        <div className='flex flex-col justify-center items-center gap-8 text-center'>
            <div className='text-3xl md:text-6xl font-extrabold'>Adventure of <br></br><span className='text-yellow-400'>Delicacies</span></div>
            <div className="text-gray-400 font-md ">"Discover and share your favorite recipes with a passionate community of home cooks. From quick weeknight dinners to show-stopping desserts, find culinary inspiration and share your own kitchen triumphs."</div>
            <div className='flex gap-4 '><button className='bg-black rounded-lg text-white p-2  cursor-pointer  hover:scale-105'>Explore recepies</button>
            <button className='bg-white border-2 rounded-lg p-2 cursor-pointer'>About us</button></div>
        </div>
         <div className='flex  justify-center items-center '>
            
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhP9WmtXkV3bd4bkcbIMiXUM5PcB6m38n3w&s' className='w-100 h-60 rounded-lg'/>
 

</div>
   </div>
  )
}

export default Home