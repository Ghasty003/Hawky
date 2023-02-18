import Header from "./Header";
import Input from "./Input";
import Messages from './Messages';


function ChatBox() {

    return (
        <div className='w-[50%] relative'>
            <Header />

            <div className='custom-height bg-empty-chat overflow-auto'>
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
                <Messages />
            </div>

            <Input />
        </div>
    );
}

export default ChatBox;