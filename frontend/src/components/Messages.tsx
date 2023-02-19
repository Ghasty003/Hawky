import React from 'react';
import { MessagesProp } from '../types';

function Messages({ message }: {message: MessagesProp}) {

    return (
        <div className='px-2 my-3'>
            <div className='bg-[#3e3c61] w-fit p-1 max-w-[200px] rounded-b-lg'>
                { message.text }
            </div>
        </div>
    );
}

export default Messages;