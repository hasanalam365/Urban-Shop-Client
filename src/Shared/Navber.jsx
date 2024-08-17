import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Navber = () => {

    // const [isOpenProfile, setIsOpenProfile] = useState(false)

    const { user, signOutUser } = useAuth()

    const handleLogOut = () => {
        signOutUser()
        toast('Logout Successfully')
    }



    const navLinks = <>

        <li>
            <Link>
                Home
            </Link>
        </li>
        <li>
            <Link to="/products">
                Products
            </Link>
        </li>
        <li>
            <Link>
                About Us
            </Link>
        </li>


    </>

    return (
        <div>

            <div className="navbar bg-[#FF8225] p-4 h-[80px] fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <img src="/logo.png" alt="" className='h-[40px] w-[40px] block  lg:hidden' />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <div className='flex gap-2 items-center justify-center'>
                        <img src="/logo.png" alt="" className='h-[40px] w-[40px] hidden md:hidden lg:block' />
                        <Link to="/" className=" text-xl font-medium">Urban<span className='text-white'>Shop</span></Link>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-3">

                    {user?.email ? <button onClick={handleLogOut} className='btn btn-ghost text-white bg-[#12809e]'>
                        <Link>Logout</Link>
                    </button>
                        :
                        <button className='btn btn-ghost text-white bg-[#12809e]'>
                            <Link to="/login">Login</Link>
                        </button>}

                </div>
            </div>



        </div>
    );
};

export default Navber;