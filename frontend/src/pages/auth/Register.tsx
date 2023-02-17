import React from 'react';
import register from "../../assets/registerchat.png";
import NavBar from '../../components/NavBar';

function Register() {
    return (
        <>
            <NavBar />

            <div className='flex justify-around items-center mt-20'>
                <div>
                    <img className='w-[320px]' src={register} alt="register" />
                    <p className='text-2xl'>Register with us to enjoy realtime chats like no other.</p>
                </div>

                <div className='bg-navbg text-center w-96 h-96 flex flex-col rounded-md p-6'>
                    <h2 className='text-2xl'>Register</h2>

                    <form className='mt-6'>
                        <div className='flex items-center my-4'>
                            <p className='h-[40px] text-center flex items-center justify-center'>icon</p>
                            <input className='w-11/12 py-2' type="text" placeholder='Username' />
                        </div>

                        <div className='flex items-center my-4'>
                            <p className='h-[40px] text-center flex items-center justify-center'>icon</p>
                            <input className='w-11/12 py-2' type="email" placeholder='Email' />
                        </div>

                        <div className='flex items-center my-4'>
                            <p className='h-[40px] text-center flex items-center justify-center'>icon</p>
                            <input className='w-11/12 py-2' type="password" placeholder='Password' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;