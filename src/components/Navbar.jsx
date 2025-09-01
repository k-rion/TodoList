import React from 'react'

function Navbar() {
  return (
    <div>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="text-xl btn btn-ghost">Task App</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="content-center w-10 rounded-full bg-primary text-primary-content">
                    <span className='font-bold text-white'>K</span>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar