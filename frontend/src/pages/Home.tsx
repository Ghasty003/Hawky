import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import SideBar from '../components/SideBar';
import AuthContext from '../contexts/AuthContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';

function Home({ socket }: {socket: React.MutableRefObject<Socket> }) {

    const [display, setDisplay] = useState(true);

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


    React.useEffect(() => {
        socket.current.on("receive-message", data => {
          setMessages(prev => (
            [...prev, data]
          ))
        });

        socket.current.on("is-online", data => {
            console.log(data)
        });

        if (window.innerWidth <= 1200) {
            setDisplay(false);
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1200) {
                setDisplay(false);
            }
        })
    }, []);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex justify-center w-[90%] h-[500px]'>
                <SideBar onlineUser={onlineUser} />
                {display && <ChatBox socket={socket} />}
            </div>
        </div>
    );
}

export default Home;