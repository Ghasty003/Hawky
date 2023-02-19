import React from 'react';
import { io, Socket } from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import SideBar from '../components/SideBar';
import AuthContext from '../contexts/AuthContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';

function Home() {

    const socket = React.useRef<Socket>(null!);

    const { setMessages } = React.useContext(MessageContext);

    const [onlineUser, setOnlineUser] = React.useState([]);

    const { state } = React.useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    React.useEffect(() => {
        socket.current = io("http://localhost:3000");
        socket.current.emit("add-new-user", currentUser?.id);
        socket.current.on("get-online-users", (activeUsers) => {
            setOnlineUser(activeUsers);
        })
    }, [currentUser]);

    console.log(onlineUser)



    React.useEffect(() => {
        socket.current.on("receive-message", data => {
          setMessages(prev => (
            [...prev, data]
          ))
        })
    }, []);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex w-[90%] h-[500px]'>
                <SideBar />
                <ChatBox onlineUser={onlineUser} socket={socket} />
            </div>
        </div>
    );
}

export default Home;