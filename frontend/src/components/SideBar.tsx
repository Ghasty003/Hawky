import React, { useContext, useEffect } from 'react';
import avatar from "../assets/avatar-food.png";
import { AiOutlineMail, RiUserSettingsLine, AiOutlineDelete, HiOutlineLogout, FcSearch } from "react-icons/all";
import Chats from './Chats';
import AuthContext from '../contexts/AuthContext';
import { Type, User } from '../types';

function SideBar() {

    const { dispatch, state } = useContext(AuthContext);

    const { user } = state;

    const currentUser = user as User;

    const isEmpty = currentUser.displayPicture === "";

    const handleLogout = () => {
        dispatch({type: Type.LOGOUT, payload: {}});
        localStorage.removeItem("user");
    }

    return (
        <div className='flex items-start'>
            <div className='bg-[#3e3c61] p-5 w-fit h-[500px] rounded-bl-lg rounded-tl-lg'>
                <div className='flex items-center gap-1'>
                    <img className='w-10 rounded-full object-cover' src={isEmpty ? avatar : currentUser.displayPicture} alt="" />
                    <p>{ (user as User).userName }</p>
                </div>
                
                <div className='mt-10'>
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <AiOutlineMail size={25} />
                        <p>Messages</p>
                    </div>
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <RiUserSettingsLine size={25} />
                        <p>Settings</p>
                    </div>
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <AiOutlineDelete size={25} />
                        <p>Delete account</p>
                    </div>
                    <div onClick={handleLogout} className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <HiOutlineLogout size={25} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>

            <div className='px-5 bg-secondary h-[500px] overflow-auto'>
                <div className='sticky top-0 bg-secondary'>
                    <h2 className='text-2xl mb-6 sticky'>Messages</h2>

                    <form>
                        <p className='ml-1'>Find a User</p>
                        
                        <div className='bg-primary p-3 rounded-2xl'>
                            <input type="text" placeholder='Type their username' className='outline-none bg-transparent border-none' />
                            <button className='bg-secondary text-center rounded-lg p-1 active:scale-90 duration-300'>
                                <FcSearch size={20} className='inline' />Search
                            </button>
                        </div>
                    </form>

                </div>

                <div className='flex flex-col gap-5 mt-4'>
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                </div>
            </div>

        </div>
    );
}

export default SideBar;