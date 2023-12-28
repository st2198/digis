import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    return <nav className="bg-white shadow absolute w-full top-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between h-full">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <Image src='/digis.svg' height={64} width={64} alt="Logo" />
                    </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                        onClick={() => router.push(pathname === "/login" ? '/signup' : '/login')}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        {pathname === "/login" ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    </nav>
}