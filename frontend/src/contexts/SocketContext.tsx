import React, { createContext, useEffect, useRef, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp, User } from "../types";
import AuthContext from "./AuthContext";

interface test {
    test: string
}

const SocketContext = createContext<test>(null!);


export const SocketContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const socket = useRef<Socket>(null!);
    const [onlineUser, setOnlineUser] = useState([]);

    const { state } = useContext(AuthContext);
    const { user } = state;
    const currentUser = user as User;

    const test = "Hello world";
    console.log(test);

    useEffect(() => {
        socket.current = io("http://localhost:3000");
        socket.current.emit("add-new-user", currentUser?.id);
        socket.current.on("get-users", (activeUsers) => {
            setOnlineUser(activeUsers);
        })
    }, [currentUser]);


    return (
        <SocketContext.Provider value={{test}}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketContext;