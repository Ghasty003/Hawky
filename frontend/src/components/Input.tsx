import React, { useContext, useState } from 'react';
import InputEmoji from "react-input-emoji";
import img from "../assets/img.png";
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';

function Input() {

    const [text, setText] = useState<string>("");

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
        
        const body = {
            senderId: currentUser.id,
            receiverId,
            text
        }
    
        const res = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        });

        const json = await res.json();

        if (!res.ok) {
            console.log(json.error)
        }

        if (res.ok) {
            console.log(json);
            setText("");
        // socket.current.emit("send-message", json);
        setMessages(prev => [...prev, json])
        }
    }

    return (
        <form onSubmit={handleSend} className='flex bg-white items-center h-14 w-full'>
            <InputEmoji value={text} onChange={handleChange}  />

            <div className='flex items-center justify-between w-40'>
                <img src={img} alt="image" />
                <button className='bg-register px-3 py-1 mr-2 rounded-md'>Send</button>
            </div>
        </form>
    );
}

export default Input;