import React, { useState } from 'react';
import InputEmoji from "react-input-emoji";
import img from "../assets/img.png";

function Input() {

    const [message, setMessage] = useState<string>("");

    const handleChange = (message: string) => {
        setMessage(message);
    }

    return (
        <form className='flex bg-white items-center h-14 w-full'>
            <InputEmoji value={message} onChange={handleChange}  />
            {/* <input type="text" placeholder='Type your message...' className='w-[75%] outline-none px-3 h-full text-black' /> */}

            <div className='flex items-center justify-between w-40'>
                <img src={img} alt="image" />
                {/* <BsEmojiSmile size={25} className='text-black' /> */}
                <button className='bg-register px-3 py-1 mr-2 rounded-md'>Send</button>
            </div>
        </form>
    );
}

export default Input;