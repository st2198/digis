"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { AuthFormType } from '@/services/types';
import { Layout } from '@/components/Layout';

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AuthFormType>();
    const router = useRouter();

    const onSubmit = (data: AuthFormType) => {
        const { username, password } = data;
        const user = localStorage.getItem(username);
        if (user) {
            const userData = JSON.parse(user);
            if (userData.password === password) {
                localStorage.setItem('authUser', JSON.stringify({ username }));
                router.push('/');
            } else {
                setError('username', {
                    type: 'manual',
                    message: 'Invalid password. Please try again.'
                  });
            }
        } else {
            setError('username', {
                type: 'manual',
                message: 'User not found. Please sign up.'
              });
        }
    };

    useEffect(() => {
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
            router.push('/');
        }
    }, [router]);

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Character collector!</h2>
            <p className="mb-6 text-gray-600">Please login to your account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('username', { required: 'Username is required' })}
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                    type="text"
                    placeholder="Username"
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                <input
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </Layout>
    );
};

export default Login;
