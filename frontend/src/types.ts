import { Socket } from "socket.io-client";
import React from "react";

export interface DivProps {
    headingText: string;
    text: string;
    img: string;
}

export interface ProviderProp {
    children: React.ReactNode;
}

export interface User {
    _id: string;
    displayPicture: string;
    userName: string;
    password: string;
    token: string;
    email: string;
    id: string;
}

export interface Friend extends User {
    friendId: string;
    friendUsername: string;
    friendImage: string;
    userId: string;
    friendDetails: this;
}

export interface FriendProp {
    friendDetails: Friend;
}

export interface AuthReducerStateProp {
    user: User | unknown;
}

export interface FriendStateProp {
    friends: Friend | unknown;
}

export interface FriendActionProp {
    type: FriendType;
    payload: object;
}

export interface FriendContextType {
    friends: Friend[];
    dispatch: React.Dispatch<FriendActionProp>;
}

export enum Type {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export enum FriendType {
    ADD = "ADD",
    FETCH = "FETCH"
}

export interface AuthActionProp {
    type: Type,
    payload: object;
}

export interface AuthContextType {
    state: AuthReducerStateProp;
    dispatch: React.Dispatch<AuthActionProp>;
}

export interface ChatContextType {
    chat: Friend;
    setChat: React.Dispatch<React.SetStateAction<Friend>>;
    chatDiv: React.MutableRefObject<HTMLDivElement>;
}

export interface MessagesProp {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: string;
    createdAt: string;
    audio: string;
}

export interface MessagesContextType {
    messages: MessagesProp[];
    setMessages: React.Dispatch<React.SetStateAction<MessagesProp[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    queryNumber: number;
    setQueryNumber: React.Dispatch<React.SetStateAction<number>>;
}

export interface OnlineUserPtop {
    socketId: string;
    userId: string;
}

export interface SocketContextType {
    socket: React.MutableRefObject<Socket>;
}