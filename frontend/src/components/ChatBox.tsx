import { useContext, useEffect } from "react";
import MessageContext from "../contexts/MessageContext";
import SocketContext from "../contexts/SocketContext";
import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox() {

    const { messages, setMessages } = useContext(MessageContext);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.current.on("receive-message", data => {
            setMessages(prev => (
                [...prev, data]
            ))
        })
    }, []);

    return (
        <div className='w-[50%] relative'>
            <Header />

            <div className='custom-height bg-empty-chat overflow-auto'>
                {
                    messages.map(message => (
                        <Messages key={message._id} message={message} />
                    ))
                }
            </div>

            <Input />
        </div>
    );
}

export default ChatBox;