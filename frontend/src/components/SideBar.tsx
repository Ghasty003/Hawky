import React, { useContext, useEffect, useRef, useState } from 'react';
import avatar from "../assets/avatar-food.png";
import { AiOutlineMail, RiUserSettingsLine, AiOutlineDelete, HiOutlineLogout } from "react-icons/all";
import AuthContext from '../contexts/AuthContext';
import { FriendType, Type, User } from '../types';
import FriendContext from '../contexts/FriendContext';
import Message from './Message';

function SideBar() {

    const [display, setDisplay] = useState(false);
    const { dispatch, state } = useContext(AuthContext);
    
    const [friend, setFriend] = useState<User>(null!);

    const div = useRef<HTMLDivElement>(null!);

    const { user } = state;

    const currentUser = user as User;

    const isEmpty = currentUser.displayPicture === "";

    const { dispatch: friendDispatch } = useContext(FriendContext);

    const handleLogout = () => {
        dispatch({type: Type.LOGOUT, payload: {}});
        localStorage.removeItem("user");
    }

    const handleDelete =  () => {
        setDisplay(true);
    }

    useEffect(() => {
        document.addEventListener("click", (e: Event) => {
            if (div.current.contains(e.target as Node)) {
                return;
            }

            setDisplay(false);
        })
    } , []);

    const deleteAccount = async () => {
        const res = await fetch("http://localhost:3000/api/user/delete/" + currentUser.id, {
            method: "DELETE"
        });

        if (!res.ok) {
            console.log("Cannot delete account");
        }
        
        if (res.ok) {
            localStorage.removeItem("user");
            dispatch({type: Type.LOGOUT, payload: {}});
        }
    }

    useEffect(() => {
        const getFriends = async () => {
          const res = await fetch("http://localhost:3000/api/friend", {
            headers: {
              "Authorization": `Bearer ${currentUser.token}`
            }
          });
          const json = await res.json();
  
          if (!res.ok) {
            console.log(json.error);
          }
  
          if (res.ok) {
            friendDispatch({type: FriendType.FETCH, payload: json});
          }
        }
        getFriends();
    }, []);

    return (
        <div className='flex items-start'>
            <div className='bg-[#3e3c61] p-5 w-fit h-[500px] rounded-bl-lg rounded-tl-lg'>
                <div className='flex items-center gap-1'>
                    <img className='w-10 rounded-full object-cover' src={isEmpty ? avatar : currentUser.displayPicture} alt="" />
                    <p>{ currentUser.userName }</p>
                </div>

                {
                    display && (
                        <div className='fixed left-1/2 -translate-x-1/2 z-10 bg-primary px-6 py-4 rounded-md fill'>
                            <p className='text-lg'>Are you sure you want to delete account?</p>
                            
                            <div className='flex items-center justify-end gap-4 mt-3 p-2'>
                                <button onClick={deleteAccount}>Yes</button>
                                <button onClick={() => setDisplay(false)}>Cancel</button>
                            </div>
                        </div>
                    )
                }
                
                <div className='mt-10'>
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <AiOutlineMail size={25} />
                        <p>Messages</p>
                    </div>
                    <div className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <RiUserSettingsLine size={25} />
                        <p>Settings</p>
                    </div>
                    <div ref={div} onClick={handleDelete} className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <AiOutlineDelete size={25} />
                        <p>Delete account</p>
                    </div>
                    <div onClick={handleLogout} className='flex items-center gap-2 mb-10 cursor-pointer'>
                        <HiOutlineLogout size={25} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>

           <Message setFriend={setFriend} friend={friend} />

        </div>
    );
}

export default SideBar;