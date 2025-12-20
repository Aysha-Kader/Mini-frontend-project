import React from 'react'

const About = () => {
  return (
    <div>
        <div className='bg-gray-100 grid md:grid-cols-2 grid-cols-1 px-5 py-5 justify-center items-center'>
            <div className='text-5xl font-bold text-center'>About Our <br/><span className='text-orange-400'>Culinar</span>    Stories....
            </div>
            <div >
                <img  className='shadow-lg  rounded-lg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2omRLTN56Iebu1oaNRkPDlXJ1dmR_MVfVw&s'></img>
                </div>
        </div>
    </div>
  )
}

export default About