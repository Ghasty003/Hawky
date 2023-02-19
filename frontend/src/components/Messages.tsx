import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { MessagesProp, User } from '../types';

function Messages({ message }: {message: MessagesProp}) {

    const { state } = useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    const isOwner = message.senderId === currentUser.id;
    console.log(isOwner)

    return (
        <div className={`${isOwner ? "owner" : "not-owner"} px-2 my-3`}>
            <div className={`bg-[#3e3c61] w-fit p-1 max-w-[200px] rounded-b-lg`}>
                { message.text }
            </div>
        </div>
    );
}

export default Messages;