import React, { useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import ChatContext from "../contexts/ChatContext";
import MessageContext from "../contexts/MessageContext";
import SocketContext from "../contexts/SocketContext";
import emptychat from "../assets/emptychat.png";
import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox({ socket }: {socket: React.MutableRefObject<Socket> }) {

    const { messages, setMessages } = useContext(MessageContext);
    const { chat, setChat } = useContext(ChatContext);

    const Div = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        document.addEventListener("click", (e: Event) => {
           if (!(e.target as HTMLDivElement).classList.contains("l") && !Div.current.contains(e.target as Node)) {
                setChat(null!);
                setMessages([]);
           }
        })
    }, []);
    

    return (
        <div ref={Div} className={`${window.innerWidth <= 1200 ? "w-[90%]" : "w-[50%]"} relative`}>
            <Header />

            <div className='custom-height bg-empty-chat overflow-auto'>
                {/* <p className="text-center text-lg text-primary italic cursor-pointer">Previous messages</p> */}
                {
                    chat ? messages.map(message => (
                        <Messages key={message._id} message={message} />
                    )) : <div className="h-full flex justify-center items-center text-2xl">
                        Tap on a conversation to start chatting <img className="w-28" src={emptychat} alt="image" />
                    </div>
                }
            </div>

            <Input socket={socket} />
        </div>
    );
}

export default ChatBox;