import { useContext } from "react";
import { IoArrowBackSharp } from "react-icons/all";
import videocall from "../assets/cam.png";
import more from "../assets/more.png";
import AuthContext from "../contexts/AuthContext";
import ChatContext from "../contexts/ChatContext";
import { User } from "../types";

function Header() {

    const { state } = useContext(AuthContext);
    const { chat } = useContext(ChatContext);

    const { user } = state;
    const currentUser = user as User;

    const isMyUsername = chat?.friendDetails.friendUsername === currentUser.userName;

    return (
        <div className='bg-[#3e3c61] flex justify-between items-center h-10 px-2'>
            <IoArrowBackSharp cursor={"Pointer"} className="mobile:block hidden" />
            <p>{ isMyUsername ? chat.friendDetails.userName : chat?.friendDetails.friendUsername }</p>

            <div className='flex items-center'>
                <img className='w-7' src={videocall} alt="" />
                <img className='w-7' src={more} alt="" />
                <img src="" alt="" />
            </div>
        </div>
    );
}

export default Header;