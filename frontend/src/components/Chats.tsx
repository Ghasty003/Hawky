import React, { useContext, useEffect, useState, useRef } from 'react';
import avatar from "../assets/avatar-food.png";
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import MessageContext from '../contexts/MessageContext';
import { Friend, FriendProp, User } from '../types';
import imagechat from "../assets/imagechat.png";

const Chats: React.FC<{friend: FriendProp, onlineUser: never[] }> = ({ friend, onlineUser }) => {

    const isEmpty = friend.friendDetails.friendImage === "";

    const { state } = useContext(AuthContext);
    const { setChat, chatDiv } = useContext(ChatContext);
    const { setMessages, messages  } = useContext(MessageContext);

    const [lastMessage, setLastMessage] = useState("");
    const [isOnline, setIsOnline] = useState<boolean>(false);

    const { user  } = state;

    const currentUser = user as User;

    const isEqual = currentUser.userName === friend.friendDetails.friendUsername;

    const userId = currentUser.id;
    const isMyId = friend.friendDetails.friendId === currentUser.id;
    const friendId = isMyId ? friend.friendDetails.userId : friend.friendDetails.friendId;

    const handleClick = async () => {
        setChat(friend as Friend);
    
        
        const res = await fetch("http://localhost:3000/api/message/"+ userId + "/" + friendId, {
            headers: {
                "Authorization": `Bearer ${currentUser.token}`
            }
        });
        const json = await res.json();
  
        if (!res.ok) {
          console.log(json.error)
        }
  
        if (res.ok) {
          setMessages(json);
        }
    }


    useEffect(() => {
        const getLastMessage = async () => {
            const res = await fetch("http://localhost:3000/api/message/lastMessage/" + userId + "/" + friendId, {
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`
                }
            });

            const json = await res.json();
  
            if (!res.ok) {
                console.log(json.error)
            }
    
            if (res.ok) {
                setLastMessage(json?.text);
            }
        }

        getLastMessage();
    }, [messages]);

    return (
        <div ref={chatDiv} onClick={handleClick} className='flex pr-8 items-start justify-between bg-black cursor-pointer l'>
            <div className='flex gap-3 l'>
                <img src={isEmpty ? avatar : friend.friendDetails.friendImage} className='w-12 rounded-full object-cover l' alt="avatar" />
                <div>
                    <p className='font-bold capitalize l'>{isEqual ? friend.friendDetails.userName : friend.friendDetails.friendUsername }</p>
                    {
                       lastMessage === "image-alt-send" ?  <p className='flex items-center text-red-400 l'> <img className='w-5 l' src={imagechat} alt="image" /> image</p> :
                        <p className='text-sm w-16 overflow-hidden whitespace-nowrap text-ellipsis l'>{ lastMessage  }</p>
                    }
                </div>
            </div>
            <p className='text-gray-300 l'>
                
            </p>
        </div>
    );
}

export default Chats;