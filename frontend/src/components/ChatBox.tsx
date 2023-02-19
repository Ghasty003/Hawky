import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import ChatContext from "../contexts/ChatContext";
import MessageContext from "../contexts/MessageContext";
import SocketContext from "../contexts/SocketContext";
import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox({ socket}: {socket: React.MutableRefObject<Socket>}) {

    const { messages, setMessages } = useContext(MessageContext);
    const { chat } = useContext(ChatContext);
    

    return (
        <div className='w-[50%] relative'>
            <Header />

            <div className='custom-height bg-empty-chat overflow-auto'>
                {
                    chat ? messages.map(message => (
                        <Messages key={message._id} message={message} />
                    )) : <div className="h-full flex justify-center items-center text-2xl">Tap on a conversation to start Chatting</div>
                }
            </div>

            <Input socket={socket} />
        </div>
    );
}

export default ChatBox;