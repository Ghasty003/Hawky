import React from 'react';
import ChatBox from '../components/ChatBox';
import SideBar from '../components/SideBar';

function Home() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex w-[90%]'>
                <SideBar />
                <ChatBox />
            </div>
        </div>
    );
}

export default Home;