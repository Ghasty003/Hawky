import videocall from "../assets/cam.png";
import more from "../assets/more.png";

function Header() {
    return (
        <div className='bg-[#3e3c61] flex justify-between items-center h-10 px-2'>
            <p>Username</p>

            <div className='flex items-center'>
                <img className='w-7' src={videocall} alt="" />
                <img className='w-7' src={more} alt="" />
                <img src="" alt="" />
            </div>
        </div>
    );
}

export default Header;