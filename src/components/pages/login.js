import React, { useState } from 'react';
import SnTLogo from '../../assets/SnTLogo.png';


const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const handleEmailChange = (e) => {
            setEmail(e.target.value);
        };
    
        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //login logic here
            console.log('Email:', email);
            console.log('Password:', password);
            // Reset form after submission
            setEmail('');
            setPassword('');
        };
    return (
        <div id="login" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 border rounded-md border-10 border-blue-300">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"><a href="/" smooth={true} duration={500}>Welcome
                    <img className="h-12 w-auto mx-auto mt-2 block" src={SnTLogo} alt="Logo" />
                    </a></h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                        <input type="email" id="email" placeholder='Email' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
                        <input type="password" placeholder='Password' id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
                </form>
                <h3 className="mt-4">Do not have an account?<a href="signup"><span className="text-indigo-600 hover:text-blue-400 mx-1">Sign Up</span></a> </h3>
                </div>
            </div>
        </div>
    );
};

export default Login;