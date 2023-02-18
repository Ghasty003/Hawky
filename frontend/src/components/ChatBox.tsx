import React from 'react';
import videocall from "../assets/cam.png";
import more from "../assets/more.png";

function ChatBox() {
    return (
        <div className=''>
            <div className='bg-[#3e3c61]'>
                <p>Username</p>

                <div>
                    <img src={videocall} alt="" />
                    <img src={more} alt="" />
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
        </div>
    );
}

export default ChatBox;