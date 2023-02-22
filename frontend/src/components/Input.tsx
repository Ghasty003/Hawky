import React, { useContext, useState, useEffect } from 'react';
import InputEmoji from "react-input-emoji";
import { AiFillAudio } from "react-icons/all";
import { Socket } from 'socket.io-client';
import img from "../assets/img.png";
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';


function convertTobase64(file: Blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

function Input({ socket }: { socket: React.MutableRefObject<Socket> }) {

    const [text, setText] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const file = e.target.files[0];
                const base64 = await convertTobase64(file);
                setImage(base64 as string);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const { state } = useContext(AuthContext);
    const { chat } = useContext(ChatContext);
    const { setMessages } = useContext(MessageContext);

    const { user } = state;
    const currentUser = user as User;

    const isMyId = chat?.friendDetails.friendId === currentUser.id;
    const receiverId = isMyId ? chat?.friendDetails.userId : chat?.friendDetails.friendId;

    const handleChange = (text: string) => {
        setText(text);
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setImage("");

        if ( !text && !image) {
            return
        }
        
        const body = {
            senderId: currentUser.id,
            receiverId,
            text,
            image
        }
    
        const res = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(body)
        });

        const json = await res.json();

        if (!res.ok) {
            console.log(json.error)
        }

        if (res.ok) {
            setText("");
            socket.current.emit("send-message", json);
            setMessages(prev => [...prev, json])
        }
    }

    

    return (
        <form onSubmit={handleSend} className={`${chat ? "bg-white" : "bg-empty-chat"} flex items-center h-14 w-full`}>
            {
                chat && (
                    <>
                        <div className='w-[80%]'>
                            <InputEmoji value={text} onChange={handleChange}  />
                        </div>

                        <div className='flex items-center gap-5 justify-between w-40'>
                            <label title='choose image' className='cursor-pointer' htmlFor="image">
                                <img src={img} alt="image" />
                            </label>
                            <input onChange={e => handleUpload(e)} className='hidden' type="file" id="image" />
                            <AiFillAudio size={25} cursor="pointer" color="black" />
                            <button title='send' className='bg-register px-3 py-1 mr-2 rounded-md'>Send</button>
                        </div>
                    </>
                )
            }
        </form>
    );
}

export default Input;