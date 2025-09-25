import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Open Modal Button */}
      <button
        className="flex items-center gap-3 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 transform border-none shadow-lg btn group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl hover:scale-105 hover:shadow-xl sm:mt-0"
        onClick={() => document.getElementById("auth_modal").showModal()}
      >
        Login
      </button>

      {/* Modal */}
      <dialog id="auth_modal" className="modal">
        <div className="max-w-md p-8 bg-white border border-gray-200 shadow-2xl modal-box rounded-2xl">
          {/* Close Button */}
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
            {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
          </h2>
          <p className="mb-6 text-sm text-center text-gray-500">
            {isLogin
              ? "Login to manage your tasks and stay productive."
              : "Sign up to start managing your tasks with ease."}
          </p>

          {/* Form */}
          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <button
                type="button"
                className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login / Signup Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white transition-transform transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:from-blue-600 hover:to-purple-600"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Switch Link */}
          <div className="mt-6 text-sm text-center text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  className="font-semibold text-purple-600 hover:underline"
                  onClick={() => setIsLogin(false)}
                  type="button"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="font-semibold text-purple-600 hover:underline"
                  onClick={() => setIsLogin(true)}
                  type="button"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
