import React from 'react';
import avatar from "../assets/avatar-food.png";
import { FriendProp } from '../types';

const Chats: React.FC<{friend: FriendProp}> = ({ friend }) => {

    const isEmpty = friend.friendDetails.friendImage === "";
    return (
        <div className='flex pr-8 items-start justify-between cursor-pointer'>
            <div className='flex gap-3'>
                <img src={isEmpty ? avatar : friend.friendDetails.friendImage} className='w-12 rounded-full object-cover' alt="avatar" />
                <div>
                    <p className='font-bold capitalize'>username</p>
                    <p className='text-sm'>last message</p>
                </div>
            </div>
            <p className='text-gray-300'>time sent</p>
        </div>
    );
}

export default Chats;