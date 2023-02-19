import React, { createContext, useEffect, useRef, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp, SocketContextType, User } from "../types";
import AuthContext from "./AuthContext";



const SocketContext = createContext<SocketContextType>(null!);


export const SocketContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const socket = useRef<Socket>(null!);
    const [onlineUser, setOnlineUser] = useState([]);

    const { state } = useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    useEffect(() => {
        socket.current = io("http://localhost:3000");
        socket.current.emit("add-new-user", currentUser?.id);
        socket.current.on("get-online-users", (activeUsers) => {
            setOnlineUser(activeUsers);
        })
    }, [currentUser]);

    console.log(onlineUser)

    return (
        <SocketContext.Provider value={{socket}}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketContext;