import React from 'react'

const About = () => {
  return (
    <div className='px-4'>
        <div className='bg-gray-100 grid md:grid-cols-2 grid-cols-1 px-5 py-10 justify-center items-center rounded-lg gap-3'>
            <div className='text-5xl font-bold text-center'>About Our <br/><span className='text-orange-400'>Culinar</span>    Stories....
            </div>
            <div className='flex justify-center'>
                <img  className='shadow-lg  rounded-lg ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2omRLTN56Iebu1oaNRkPDlXJ1dmR_MVfVw&s'></img>
                </div>
        </div>

        <div className='grid cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-10 shadow-lg rounded-lg'>
          <div className='p-2 gap-5'>
            <div className='text-2xl text-orange-400 font-bold'>1 Million+</div>
            <div className='text-gray-400'>Registered Flavoriz Users</div>
          </div>

          <div className='p-2 gap-5'>
            <div className='text-2xl text-orange-400 font-bold'>5000+</div>
            <div className='text-gray-400'>Verified Chefs in Community</div>
          </div>

          <div className='p-2 gap-5'>
            <div className='text-2xl text-orange-400 font-bold'>98%</div>
            <div className='text-gray-400'>User Satisfication Rate</div>
          </div>
          <div className='p-2 gap-5'>
            <div className='text-2xl text-orange-400 font-bold'>10,1000+</div>
            <div className='text-gray-400'>Officially Published Recepies</div>
          </div>
         
        </div>

         <div  className='px-5 py-8'>
          <div className='text-center text-4xl font-semibold py-6'>We believe in the <br/>
          <span className='text-orange-400'>transformative power </span><br/>
          of cooking and good food</div>
          <div className='text-gray-400 text-center'>We are a home to variety of recepies worldwide for you to learn to have an opportunity to savor life.<br/>
          Our platform is a celebration of culinary diversity,bringing together home cooks and food enthusiasts.
          <div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-7 '>
          
         <div className='pt-2'>
            <div className='bg-orange-400 text-white text-3xl  text-center rounded-lg py-20 shadow-lg hover:scale-75 cursor-pointer'>
              "Flavoriz has always helped my cooking"
          </div>
          </div>

          <div className='pt-5 '>
            <div className=' text-orange-400 text-3xl  text-center rounded-lg py-20 shadow-lg hover:scale-75 cursor-pointer'>
              "Cooking has never been this dope!!"
          </div>
          </div>


          <div className='pt-8'>
             <div className='bg-orange-400 text-white text-3xl  text-center rounded-lg py-20 shadow-lg hover:scale-75 cursor-pointer'>
              "Cooking has never been this easy!!"
          </div>
          </div>

           <div >
            <div className=' text-orange-400 text-3xl  text-center rounded-lg py-20 shadow-lg hover:scale-75 cursor-pointer'>
              "Flavoriz has always sparked my culinary game"
          </div>
          </div>
        </div>
        
    </div>
     </div>
     </div>
  )
}

export default About;