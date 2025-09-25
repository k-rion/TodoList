import React from "react";
import AuthModal from "./AuthModal";
import { CheckSquare, Menu, X, Bell, Search } from "lucide-react";

function Navbar() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="mb-8 border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 shadow-sm rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <CheckSquare className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Taskflow</span>
              <span className="px-2 py-1 ml-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                Pro
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {/* <div className="flex-1 hidden max-w-md mx-8 md:block">
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full py-2 pl-10 pr-4 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div> */}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* SignUp Button */}
            <AuthModal/>

            {/* Notification Bell */}
            {/* <button className="relative hidden p-2 transition-colors duration-200 rounded-lg sm:flex hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-1 -right-1"></span>
            </button> */}

            {/* Mobile Menu Button */}
            {/* <button 
              className="p-2 transition-colors duration-200 rounded-lg md:hidden hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
            </button> */}

            {/* User Profile */}
            {/* <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <div className="text-sm font-medium text-gray-900">Kevin</div>
                <div className="text-xs text-gray-500">Premium Member</div>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="flex items-center justify-center w-10 rounded-full shadow-sm bg-gradient-to-r from-blue-500 to-purple-500">
                    <span className="font-bold text-white">K</span>
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200">
                  <li><a className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">Profile</a></li>
                  <li><a className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">Settings</a></li>
                  <li><a className="text-red-600 hover:text-red-700 hover:bg-red-50">Logout</a></li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {/*  {isMenuOpen && (
          <div className="py-4 space-y-4 border-t border-gray-200 md:hidden">
            {/* Mobile Search */}
        {/* <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full py-2 pl-10 pr-4 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}

        {/* Mobile Menu */}
        {/* <div className="flex flex-col gap-2">
              <a href="#" className="px-4 py-2 font-medium text-gray-700 transition-colors duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50">
                Dashboard
              </a>
              <a href="#" className="px-4 py-2 font-medium text-gray-700 transition-colors duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50">
                Analytics
              </a>
              <a href="#" className="px-4 py-2 font-medium text-gray-700 transition-colors duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50">
                Settings
              </a>
            </div>  */}
        {/* </div> */}
        {/* )}  */}
      </div>
    </nav>
  );
}

export default Navbar;
