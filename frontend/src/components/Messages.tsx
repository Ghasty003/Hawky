import React, { useContext, useRef } from 'react';
import AuthContext from '../contexts/AuthContext';
import MessageContext from '../contexts/MessageContext';
import { MessagesProp, User } from '../types';

function Messages({ message }: {message: MessagesProp}) {

    const div = useRef<HTMLDivElement>(null!);

    const { messages } = useContext(MessageContext);
    const { state } = useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    const isOwner = message.senderId === currentUser.id;

    React.useEffect(() => {
        div.current.scrollIntoView({behavior: "smooth"});
    }, [ messages ]);

    return (
        <div ref={div} className={`${isOwner ? "owner" : "not-owner"} px-2 my-3`}>
            <div className={`${isOwner ? "owner" : "not-owner"} bg-[#3e3c61] w-fit p-1 max-w-[200px] rounded-b-lg`}>
                { message.text }
            </div>
        </div>
    );
}

export default Messages;