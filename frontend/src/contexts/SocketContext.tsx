import React, { createContext, useEffect, useRef, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp, SocketContextType, User } from "../types";
import AuthContext from "./AuthContext";



const SocketContext = createContext<SocketContextType>(null!);


export const SocketContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const socket = useRef<Socket>(null!);
    
        return (
        <SocketContext.Provider value={{socket}}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketContext;