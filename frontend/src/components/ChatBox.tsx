import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import MessageContext from "../contexts/MessageContext";
import SocketContext from "../contexts/SocketContext";
import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox({ socket}: {socket: React.MutableRefObject<Socket>}) {

    const { messages, setMessages } = useContext(MessageContext);
    

    return (
        <div className='w-[50%] relative'>
            <Header />

            <div className='custom-height bg-empty-chat overflow-auto'>
                {
                    // messages.map(message => (
                    //     <Messages key={message._id} message={message} />
                    // ))
                }
            </div>

            <Input socket={socket} />
        </div>
    );
}

export default ChatBox;