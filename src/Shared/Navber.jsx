import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Navber = () => {

    const navLinks = <>

        <li>
            <Link>
                Home
            </Link>
        </li>
        <li>
            <Link>
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
        <div className="navbar bg-[#FF8225] p-4 h-[80px]  fixed">
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
                    <a className=" text-xl font-medium">Urban<span className='text-white'>Shop</span></a>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <button className='btn '>
                    <CgProfile className='text-3xl' />
                </button>
            </div>
        </div>
    );
};

export default Navber;