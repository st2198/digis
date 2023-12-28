"use client";

import React, { useEffect, useState } from 'react';

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { Layout } from '@/components/Layout';
import { TEST_Q } from '@/services/queries/looQuery';

const Login = () => {
    const [page, setPage] = useState(1);
    const { data: loosData } = useSuspenseQuery<{ loos: { chars: any } }>(TEST_Q, { variables: { page } })
    //   const { data: looData } = useSuspenseQuery<{ loo: Loo }>(LOO_BY_ID_QUERY, { variables: { id: looId }, skip: !looId })



    console.log(loosData);
    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Loos collector!</h2>
            <p className="mb-6 text-gray-600">Please login to your account.</p>
            <button onClick={() => { setPage(page + 1) }}>Add</button>
            <button onClick={() => { setPage(page - 1) }}>Rem</button>
        </Layout>
    );
};

export default Login;
