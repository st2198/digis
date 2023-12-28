import React, { ReactNode } from 'react';
import { Header } from '@/components';
import Image from 'next/image';

type LayoutProps = {
    children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <Header />
        <main className="flex justify-center items-center h-screen bg-gray-100 pt-16">
            <div className="flex flex-row items-center justify-center w-full max-w-4xl">
                <div className="flex flex-col w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mr-10">
                    {children}
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

export default Layout;
