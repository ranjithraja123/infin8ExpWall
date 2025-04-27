import React from 'react'
import './login.css'

const Login = () => {
    return (
        <div className="login h-screen flex items-center justify-center bg-gradient-to-b from-black via-green-700 via-amber-500 to-yellow-400 bg-opacity-90">
            <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg">
                <h1 className="text-4xl text-center mb-6 font-bold text-white">The Wall.Login</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-white">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <p className="text-center text-white">Don't have an account? <a href="/signup">Click Here</a> </p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
