import React, { useContext, useEffect, useRef, useState } from 'react';
import avatar from "../assets/avatar-food.png";
import { AiOutlineMail, RiUserSettingsLine, AiOutlineDelete, HiOutlineLogout, FcSearch } from "react-icons/all";
import Chats from './Chats';
import AuthContext from '../contexts/AuthContext';
import { Friend, Type, User } from '../types';

function SideBar() {

    const [display, setDisplay] = useState(false);
    const { dispatch, state } = useContext(AuthContext);

    const [text, setText] = useState("");
    const [err, setErr] = useState("");
    const [friend, setFriend] = useState<User>(null!);
    const [friends, setFriends] = useState<Friend[]>([]);

    const isFriendPictureEmpty = friend?.displayPicture === "";

    const div = useRef<HTMLDivElement>(null!);

    const { user } = state;

    const currentUser = user as User;

    const isEmpty = currentUser.displayPicture === "";

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

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setText("");

        const res = await fetch("http://localhost:3000/api/user/" + text);
        const json = await res.json();

        if (!res.ok) {
            setErr(json.error);

            setTimeout(() => {
                setErr("");
            }, 3000);
        }

        if (res.ok) {
            setFriend(json);
        }
    }

    const handleAddFriend = async () => {

        const body = {
            userName: currentUser.userName,
            friendUsername: friend.userName,
            friendId: friend._id,
            userId: currentUser.id,
            friendImage: friend.displayPicture
        }

        const res = await fetch("http://localhost:3000/api/friend/addFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentUser.token}`
            },
            body: JSON.stringify(body)
        });

        const json = await res.json();

        if (!res.ok) {
            console.log(json.error);
        }

        if (res.ok) {
            console.log(json);
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
            setFriends(json)
            console.log(json[0]);
          }
        }
        getFriends();
      }, []);

    return (
        <div className='flex items-start'>
            <div className='bg-[#3e3c61] p-5 w-fit h-[500px] rounded-bl-lg rounded-tl-lg'>
                <div className='flex items-center gap-1'>
                    <img className='w-10 rounded-full object-cover' src={isEmpty ? avatar : currentUser.displayPicture} alt="" />
                    <p>{ (user as User).userName }</p>
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

            <div className='px-5 bg-secondary h-[500px] overflow-auto'>
                <div className='sticky top-0 bg-secondary'>
                    <h2 className='text-2xl mb-6 sticky mt-1'>Messages</h2>

                    <form onSubmit={handleSearch}>
                        <p className='ml-1'>Find a User</p>

                        <div onClick={handleAddFriend} className='flex items-center gap-1 my-2 cursor-pointer'>
                            <img className='w-10 rounded-full object-cover' src={isFriendPictureEmpty ? avatar : friend?.displayPicture} alt="" />
                            <p>{ friend?.userName }</p>
                        </div>

                        {
                            err && <div>{ err }</div>
                        }
                        
                        <div className='bg-primary p-3 rounded-2xl'>
                            <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder='Type their username' className='outline-none bg-transparent border-none' />
                            <button className='bg-secondary text-center rounded-lg p-1 active:scale-90 duration-300'>
                                <FcSearch size={20} className='inline' />Search
                            </button>
                        </div>
                    </form>

                </div>

                <div className='flex flex-col gap-5 mt-4'>
                    {
                        friends.map(friend => (
                            <Chats key={friend._id} friend={friend} />
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default SideBar;