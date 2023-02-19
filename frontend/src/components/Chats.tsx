import React, { useContext } from 'react';
import avatar from "../assets/avatar-food.png";
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import { Friend, FriendProp, User } from '../types';

const Chats: React.FC<{friend: FriendProp}> = ({ friend }) => {

    const isEmpty = friend.friendDetails.friendImage === "";

    const { state } = useContext(AuthContext);
    const { setChat, chat } = useContext(ChatContext);

    const { user  } = state;

    const currentUser = user as User;

    const isEqual = currentUser.userName === friend.friendDetails.friendUsername;

    const handleClick = async () => {
        setChat(friend as Friend);

        const userId = currentUser.id;
        const friendId = chat?.friendDetails.friendId;
    
        
        const res = await fetch("http://localhost:3000/api/messages/"+ userId + "/" + friendId );
        const json = await res.json();
  
        if (!res.ok) {
          console.log(json.error)
        }
  
        if (res.ok) {
        //   setMessages(json);
          console.log(json)
        }
    }

    return (
        <div onClick={handleClick} className='flex pr-8 items-start justify-between cursor-pointer'>
            <div className='flex gap-3'>
                <img src={isEmpty ? avatar : friend.friendDetails.friendImage} className='w-12 rounded-full object-cover' alt="avatar" />
                <div>
                    <p className='font-bold capitalize'>{isEqual ? friend.friendDetails.userName : friend.friendDetails.friendUsername }</p>
                    <p className='text-sm'>last message</p>
                </div>
            </div>
            <p className='text-gray-300'>time sent</p>
        </div>
    );
}

export default Chats;