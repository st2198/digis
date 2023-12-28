"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import { useSignupForm } from './useSignupForm';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { passwordValidation, usernameValidation } from '@/services/validationRules';

const Signup = () => {
    const { register, handleSubmit, errors } = useSignupForm(); 
    useAuthRedirect('/'); 

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Character collector!</h2>
            <p className="mb-6 text-gray-600">Please create your account.</p>
            <form onSubmit={handleSubmit}>
                <input
                    {...register('username', usernameValidation)}
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                    type="text"
                    placeholder="Username"
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                <input
                    {...register('password', passwordValidation)}
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-black"
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </Layout>
    );
};

export default Signup;
