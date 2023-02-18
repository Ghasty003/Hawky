import React from 'react';
import { BsEmojiSmile } from "react-icons/all";
import videocall from "../assets/cam.png";
import more from "../assets/more.png";
import img from "../assets/img.png";
import Messages from './Messages';


function ChatBox() {
    return (
        <div className='w-[50%] relative'>
            <div className='bg-[#3e3c61] flex justify-between items-center py-3 px-2'>
                <p>Username</p>

                <div className='flex items-center'>
                    <img className='w-7' src={videocall} alt="" />
                    <img className='w-7' src={more} alt="" />
                    {/* <img src="" alt="" /> */}
                </div>
            </div>

            <div className='h-[78%] bg-empty-chat relative z-10 py-3'>
                <Messages />
            </div>

            <form className='flex bg-white items-center h-[12%] w-full absolute z-0 bottom-0'>
                <input type="text" placeholder='Type your message...' className='w-[75%] outline-none px-3 h-full text-black' />
                <div className='flex items-center justify-between w-[25%]'>
                    <img src={img} alt="image" />
                    <BsEmojiSmile size={25} className='text-black' />
                    <button className='bg-register px-3 py-1 mr-2 rounded-md'>Send</button>
                </div>
            </form>
        </div>
    );
}

export default ChatBox;