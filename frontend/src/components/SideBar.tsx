import React from 'react';
import avatar from "../assets/avatar-food.png";
import { AiOutlineMail, RiUserSettingsLine, AiOutlineDelete, HiOutlineLogout, FcSearch } from "react-icons/all";

function SideBar() {
    return (
        <div className='flex items-start'>
            <div className='bg-[#3e3c61] p-5 w-fit min-h-[500px] rounded-bl-lg rounded-tl-lg'>
                <div className='flex items-center gap-2'>
                    <img className='w-10 rounded-full object-cover' src={avatar} alt="" />
                    <p>username</p>
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
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <HiOutlineLogout size={25} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>

            <div className='px-5 py-3 bg-secondary min-h-[500px] h-fit'>
                <h2 className='text-2xl mb-6'>Messages</h2>

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

        </div>
    );
}

export default SideBar;