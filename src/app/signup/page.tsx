"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Header } from '@/components';

import '../../app/globals.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSignup = () => {
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            setMessage('Username already exists. Please choose a different username.');
            return;
        }

        localStorage.setItem(username, JSON.stringify({ username, password }));
        router.push('/login');
    };

    useEffect(() => {
        const authUser = localStorage.getItem('authUser');

        if (authUser) {
            router.push('/');
        }

    }, [router]);

    return (
        <div>
            <Header />

            <main className="flex justify-center items-center h-screen bg-gray-100 pt-16">
                <div className="flex flex-row items-center justify-between w-full max-w-4xl">
                    <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign Up</h2>
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
                            onClick={handleSignup}
                        >
                            Sign Up
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

export default Signup;
