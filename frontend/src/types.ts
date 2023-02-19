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
    friends: Friend;
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