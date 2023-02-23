import React, { useContext, useRef } from 'react';
import { FiPlay, CiPause1 } from "react-icons/all";
import AuthContext from '../contexts/AuthContext';
import MessageContext from '../contexts/MessageContext';
import { MessagesProp, User } from '../types';
import voice from "../assets/voice.png";

function Messages({ message }: {message: MessagesProp}) {

    const div = useRef<HTMLDivElement>(null!);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [time, setTime] = React.useState("00:00");

    const { messages } = useContext(MessageContext);
    const { state } = useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    const isOwner = message.senderId === currentUser.id;

    React.useEffect(() => {
        div.current.scrollIntoView({behavior: "smooth"});
    }, [ messages ]);

    const audio = useRef<HTMLAudioElement>(null!);

    React.useEffect(() => {
        audio.current?.addEventListener("play", () => {
            setIsPlaying(true);
        });

        audio.current?.addEventListener("pause", () => {
            setIsPlaying(false);
        })

        function formatTime(time: number) {
            const minute = Math.floor(time / 60);
            const minutes = (minute >= 10) ? minute : "0" + minute;
            const second = Math.floor(time % 60);
            const seconds = (second >= 10) ? second : "0" + second;
            return minutes + ":" + seconds;
        }

        audio.current?.addEventListener("timeupdate", () => {
            setTime(formatTime(audio.current.currentTime))
        })
    }, []);

    const handlePause = () => {
        audio.current.pause();
    }

    const handlePlay = () => {
        audio.current.play();
    }

    return (
        <div ref={div} className={`${isOwner ? "owner" : "not-owner"} px-2 my-3`}>
            <div className={`${isOwner && "flex flex-col items-end"}`}>
                {message.text && <div className={`${isOwner ? "owner" : "not-owner"} bg-[#3e3c61] w-fit p-1 max-w-[200px] rounded-b-lg`}>
                    { message.text }
                </div>}
                { message.image && <img className='w-36 my-2' src={message.image} alt="" />}
                {message.audio && <div>
                    <audio ref={audio} className="hidden" src={message.audio} controls></audio>
                    <div className='bg-primary w-64 flex items-center justify-between px-3 py-2 rounded-md'>
                        {
                            isPlaying ? <CiPause1 onClick={handlePause} cursor={"pointer"} /> : <FiPlay onClick={handlePlay} cursor={"pointer"} />
                        }
                        <img src={voice} alt="audio" className='w-10' />
                        <p>{ time }</p>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Messages;