import React from 'react';
import { Link } from "react-router-dom"
import login from "../../assets/loginchat.png";
import NavBar from '../../components/NavBar';
import { AiOutlineUser, RiLockPasswordFill, MdOutlineAlternateEmail } from "react-icons/all";

function Login() {
    return (
        <>
            <NavBar />

            <div className='flex justify-around items-center mt-20'>
                <div>
                    <img className='w-[340px]' src={login} alt="register" />
                    <p className='text-2xl'>Welcome back. Login your account to continue having fun.</p>
                </div>

                <div className='bg-navbg text-center w-96 h-[400px] flex flex-col rounded-lg p-6'>
                    <h2 className='text-2xl font-heading'>Login</h2>

                    <form className='mt-6'>
                        <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                            <p className='h-[40px] text-center flex items-center justify-center p-2'><AiOutlineUser size={20} /></p>
                            <input className='w-11/12 py-2 px-1 bg-gray-900' type="text" placeholder='Username' />
                        </div>

                        <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                            <p className='h-[40px] text-center flex items-center justify-center p-2'><RiLockPasswordFill size={20} /></p>
                            <input className='w-11/12 py-2 px-1 bg-gray-900' type="password" placeholder='Password' />
                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <button className='bg-login text-gray-600 px-4 py-2 rounded-lg font-bold flex items-center justify-center drop-shadow-2xl active:scale-75 duration-300'>
                                <div className='animate-spin w-5 h-5 border-[2px] border-gray-600 rounded-full border-t-black mr-1'></div> Login
                            </button>
                       </div>
                    </form>

                    <h3 className='mt-7'>Don't have an account? <Link className='text-register' to="/register">Register</Link></h3>
                </div>
            </div>
        </>
    );
}

export default Login;