import React, { useState } from 'react';
import { BsEmojiSmile } from "react-icons/all";
import videocall from "../assets/cam.png";
import more from "../assets/more.png";
import img from "../assets/img.png";
import Messages from './Messages';
import InputEmoji from "react-input-emoji";


function ChatBox() {
    const [m, setM] = useState("");
    const handle = (m: any) => {
        setM(m)
    }
    return (
        <div className='w-[50%] relative'>
            <div className='bg-[#3e3c61] flex justify-between items-center h-10 px-2'>
                <p>Username</p>

                <div className='flex items-center'>
                    <img className='w-7' src={videocall} alt="" />
                    <img className='w-7' src={more} alt="" />
                    <img src="" alt="" />
                </div>
            </div>

            <div className='custom-height bg-empty-chat overflow-auto'>
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
            </div>
        </div>
    );
}

export default ChatBox;