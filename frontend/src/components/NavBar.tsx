import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/hawky.png";

function NavBar() {
    return (
        <div className='flex justify-around items-center py-6 bg-navbg sticky top-0'>
            <Link to="/" className='flex gap-2 items-center'>
                <img className='w-8 rounded-full object-cover' src={logo} alt="logo" />
                <h2 className='text-2xl font-heading'>Hawky</h2>
            </Link>

            <div className='flex items-center gap-6'>
                <button className='bg-login text-gray-600 text-sm sm:text-base sm:px-4 p-2 sm:py-2 rounded-lg font-bold drop-shadow-2xl active:scale-75 duration-300'>
                    <Link to="/login">Login</Link>
                </button>
                <button className='bg-register text-gray-600 text-sm sm:text-base sm:px-4 p-2 sm:py-2 rounded-lg font-bold drop-shadow-2xl active:scale-75 duration-300'>
                    <Link to="/register">Register</Link>
                </button>
            </div>
        </div>
    );
}

export default NavBar;