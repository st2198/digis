import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAuthRedirect(redirect: string) {
  const pathname = usePathname();
  const [isUserAuth, setUserAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');

    if (!authUser && pathname === redirect) {
      router.push(redirect);
    } else {
      setUserAuth(true);
    }
  }, [router]);

  return isUserAuth;
}
