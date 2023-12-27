import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Header } from '@/components';

import '../../app/globals.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const authUser = localStorage.getItem('authUser');

        if (authUser) {
            router.push('/');
        }

    }, [router]);

    const handleLogin = () => {
        const user = localStorage.getItem(username);
        if (user) {
            const userData = JSON.parse(user);
            if (userData.password === password) {
                localStorage.setItem('authUser', JSON.stringify({ username }));

                router.push('/');
            } else {
                setMessage('Invalid password. Please try again.');
            }
        } else {
            setMessage('User not found. Please sign up.');
        }
    };

    return (
        <div>
            <Header />

            <main className="flex justify-center items-center h-screen bg-gray-100 pt-16">
                <div className="flex flex-row items-center justify-center w-full max-w-4xl">
                    <div className="flex flex-col w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mr-10">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Loos collector!</h2>
                        <p className="mb-6 text-gray-600">Please login to your account.</p>
                        {message && <p className="text-red-500">{message}</p>}
                        <input
                            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    <div className="hidden md:flex items-center justify-center rounded-lg">
                        <Image
                            src="/xmas.jpg"
                            width={400}
                            height={280}
                            alt="Christmas tree picture"
                            className="rounded-lg shadow-sm"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
