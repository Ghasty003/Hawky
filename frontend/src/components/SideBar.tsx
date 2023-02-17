import React from 'react';
import avatar from "../assets/avatar-food.png";
import { AiOutlineMail, RiUserSettingsLine, AiOutlineDelete, HiOutlineLogout } from "react-icons/all";

function SideBar() {
    return (
        <div className=''>
            <div className='bg-secondary p-5 w-fit'>
                <div className='flex items-center'>
                    <img className='w-10 rounded-full object-cover' src={avatar} alt="" />
                    <p>username</p>
                </div>
                
                <div className='mt-10'>
                    <div className='flex items-center gap-2 mb-4'>
                        <AiOutlineMail size={25} />
                        <p>Messages</p>
                    </div>
                    <div className='flex items-center gap-2 mb-4'>
                        <RiUserSettingsLine size={25} />
                        <p>Settings</p>
                    </div>
                    <div className='flex items-center gap-2 mb-4'>
                        <AiOutlineDelete size={25} />
                        <p>Delete account</p>
                    </div>
                    <div className='flex items-center gap-2 mb-4'>
                        <HiOutlineLogout size={25} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default SideBar;