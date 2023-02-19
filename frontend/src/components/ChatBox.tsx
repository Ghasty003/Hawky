import { useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox() {

    const { messages } = useContext(MessageContext);

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