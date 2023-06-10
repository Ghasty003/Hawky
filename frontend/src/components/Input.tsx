import React, { useContext, useState, useEffect } from 'react';
import InputEmoji from "react-input-emoji";
import { AiFillAudio, FiSend } from "react-icons/all";
import { Socket } from 'socket.io-client';
import img from "../assets/img.png";
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';


function convertTobase64(file: Blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

function Input({ socket }: { socket: React.MutableRefObject<Socket> }) {

    const [text, setText] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const file = e.target.files[0];
                const base64 = await convertTobase64(file);
                setImage(base64 as string);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const { state } = useContext(AuthContext);
    const { chat } = useContext(ChatContext);
    const { setMessages } = useContext(MessageContext);

    const { user } = state;
    const currentUser = user as User;

    const isMyId = chat?.friendDetails.friendId === currentUser.id;
    const receiverId = isMyId ? chat?.friendDetails.userId : chat?.friendDetails.friendId;

    const handleChange = (text: string) => {
        setText(text);
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setImage("");

        if (!text && !image) {
            return;
        }
        
        const body = {
            senderId: currentUser.id,
            receiverId,
            text,
            image,
        }
    
        const res = await fetch(`https://hawky.onrender.com/api/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(body)
        });

        const json = await res.json();

        if (!res.ok) {
            console.log(json.error)
        }

        if (res.ok) {
            setText("");
            socket.current.emit("send-message", json);
            setMessages(prev => [...prev, json])
        }
    }

    const timer = React.useRef<HTMLDivElement>(null!);
    const recorder = React.useRef<MediaRecorder>(null!);
    const interval = React.useRef<unknown>(null!);
    const [time, setTime] = useState(0);


    const cancelRecording = () => {
       setTime(0);
       timer.current.classList.add("opacity-0");
       clearInterval(interval.current as any);
    }

    const stopRecording = async () => {
        recorder.current.stop();
        cancelRecording();
    }


    const handleRecord = async () => {
        interval.current = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        if (timer.current.classList.contains("opacity-0")) {
            timer.current.classList.remove("opacity-0");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
           });
        const items: Blob[] = [];
    
        recorder.current = new MediaRecorder(stream);
    
        recorder.current.addEventListener("dataavailable", async (e) => {
            items.push(e.data);

            if (recorder.current.state === "inactive") {
                const blob = new Blob(items, {
                    type: "audio/webm"
                });

                const audio = await convertTobase64(blob);
                
                const body = {
                    senderId: currentUser.id,
                    receiverId,
                    audio,
                    text: "",
                    image: ""
                };
        
                const res = await fetch(`https://hawky.onrender.com/api/message`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser.token}`
                    },
                    body: JSON.stringify(body)
                });
                
                const json = await res.json();
        
                if (!res.ok) {
                    cancelRecording();
                    console.log(json.error);
                }
        
                if (res.ok) {
                    cancelRecording();
                    setMessages(prev => [...prev, json]);
                }
            }
        });
        recorder.current.start();
    }
    

    return (
        <form onSubmit={handleSend} className={`${chat ? "bg-white" : "bg-empty-chat"} flex items-center h-14 w-full`}>
            {
                chat && (
                    <>
                        <div className='w-[80%]'>
                            <InputEmoji value={text} onChange={handleChange}  />
                        </div>

                        <div className='flex items-center mobile:gap-1 gap-5 justify-between w-40 mobile:w-32'>
                            <label data-tooltip='choose image' className='tooltip cursor-pointer' htmlFor="image">
                                <img className='mobile:w-5' src={img} alt="image" />
                            </label>
                            <input onChange={e => handleUpload(e)} className='hidden' type="file" id="image" />

                            <div className='relative'>
                                <div ref={timer} className='absolute opacity-0 bg-primary -top-40 w-40 -left-20 rounded-md p-3'>
                                    <p className='text-center'>Recording..</p>
                                    <div className='flex justify-between my-3'>
                                        <p onClick={cancelRecording} className='cursor-pointer'>Cancel</p>
                                        <p onClick={stopRecording} className='cursor-pointer'>Stop</p>
                                    </div>

                                    <div className='text-center'>{ time + "s" }</div>
                                </div>

                                <div onClick={handleRecord} data-tooltip="voice recording" className='tooltip'>
                                    <AiFillAudio className='active:scale-150 duration-300 text-2xl mobile:text-lg' cursor="pointer" color="#5b5d8d" />
                                </div>
                            </div>

                            <button data-tooltip='send message' className='tooltip text-2xl text-primary mobile:text-lg mobile:mr-4 mr-5 rounded-md'><FiSend /></button>
                        </div>
                    </>
                )
            }
        </form>
    );
}

export default Input;