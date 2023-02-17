import React from 'react';

function SideBar() {
    return (
        <div>
            <div className='bg-secondary'>
                <div>
                    <img src="" alt="" />
                    <p>username</p>
                </div>
                
                <div>
                    <div>
                        <p>Icon</p>
                        <p>Messages</p>
                    </div>
                    <div>
                        <p>Icon</p>
                        <p>Settings</p>
                    </div>
                    <div>
                        <p>Icon</p>
                        <p>Delete account</p>
                    </div>
                    <div>
                        <p>Icon</p>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;