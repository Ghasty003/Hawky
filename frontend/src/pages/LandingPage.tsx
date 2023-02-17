import React from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import videochat from "../assets/video-chat.jpg";
import groupchat from "../assets/groupchat.jpg";
import chat from "../assets/chat.jpg";
import audiochat from "../assets/audiochat.jpg";

function Div({headingText, text, img}: DivProps) {
    return (
        <div className='flex items-center justify-around mb-20 even:flex-row-reverse'>
            <img className='w-[300px] rounded-md' src={img} alt="chat" />
            <div className='flex flex-col gap-6'>
                <h2 className='font-heading text-3xl'>{ headingText }</h2>
                <p className='text-lg'>{ text }</p>
            </div>
        </div>
    )
}

function LandingPage() {
    return (
        <div>
            <NavBar />

            <div className='mt-20'>
                <Div img={chat} headingText="Instant Realtime messaging." 
                text='Sending message in realtime to loved ones and friends from all over the world.' />
                <Div img={groupchat} headingText="Integrated Group chat" 
                text='Creating a group chat for any purporse.' />
                <Div img={videochat} headingText="Video call system." 
                text='Video calling is also available for communication for all users.' />
                <Div img={audiochat} headingText="Audio call system." 
                text='The Video calling system not for you? Audio calling is available for you as an alternative.' />
            </div>

            <div className='flex justify-center items-center mb-8'>
                <button className='bg-register text-gray-600 px-4 py-2 rounded-lg font-bold drop-shadow-2xl active:scale-75 duration-300'>
                    <Link to="/register">Get started</Link>
                </button>
            </div>

            <div className='w-3/4 m-auto h-[2px] bg-white'></div>

            <div className='flex justify-center items-center my-10 text-lg'>
                <p>Copyright &copy; Ghasty, 2023. All rights reserved. </p>
            </div>
        </div>
    );
}

export default LandingPage;