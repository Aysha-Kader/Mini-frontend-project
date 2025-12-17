import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div>
            <header className="sticky top-0 z-50">
                <nav className="py-3 px-6 flex justify-between items-center">
                    {/* logo */}
                    <h1 className="text-4xl font-extrabold  cursor-pointer drop-shadow ">
                        <span>Flav</span><span className="text-yellow-500">oriz</span></h1>
                    {/* buttons */}

                    {!isOpen && (
                        <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
                            <HiMenu size={30} />
                        </div>
                    )

                    }

                    {isOpen && (
                        <div className="cursor-pointer md:hidden z-20 " onClick={toggleMenu}>
                            < IoClose size={30} />
                        </div>
                    )

                    }
                    {isOpen ? (
                        <div className=' overflow-y-hidden fixed z-10 top-0 left-0  w-screen  min-h-screen  flex flex-col gap-10 pt-0 justify-center items-center  duration-300 ease-in '>
                            <li className="hover:text-gray-600 font-bold text-lg list-none text-gray-400  hover:scale-105">Home</li>
                            <li  className="hover:text-gray-600 font-bold text-lg list-none text-gray-400 hover:scale-105">About</li>
                            <li  className="hover:text-gray-600 font-bold text-lg list-none text-gray-400 hover:scale-105">Recepies</li>
                            <button className="bg-orange-400 rounded-lg p-2 text-white cursor-pointer hover:bg-orange-600 hover:scale-105">Login</button>

                        </div>
                    ) : (
                        <div className='bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-[-150%] w-screen  min-h-screen  flex justify-center items-center gap-10 duration-300 ease-in'></div>
                    )}
                    <div className=' items-center gap-4 hidden md:flex' >
                        <ul className="flex gap-8 text-gray-400  text-2xl cursor-pointer">
                            <li className="hover:scale-105 hover:text-gray-600">Home</li>
                            <li className="hover:scale-105 hover:text-gray-600">About</li>
                            <li className="hover:scale-105 hover:text-gray-600">Recepies</li>
                        </ul>

                    </div>
                    <div>
                        <input type="text" className="rounded-lg bg-gray-200 te-gray-500 p-3  border-gray-600 border-rounded" placeholder='Search your dishes...'/>
                        </div>
                    <div className='hidden md:flex'>
                        <button className="bg-orange-400 rounded-lg p-2 text-white cursor-pointer  hover:bg-orange-600 hover:scale-105">Login</button>

                    </div>








                </nav>
            </header>


        </div>
    )
}

export default Navbar