import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAuthRedirect() {
  const pathname = usePathname();
  const [isUserAuth, setUserAuth] = useState(false);
  const router = useRouter();

  const publicRoutes = [
    '/login',
    '/signup',
  ];

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');

    if(authUser) {
      if(publicRoutes.includes(pathname)) router.push('/');
      setUserAuth(true)
    } else {
      if(!publicRoutes.includes(pathname)) router.push('/login');
      setUserAuth(false)
    }
  }, [router]);

  return isUserAuth;
}
