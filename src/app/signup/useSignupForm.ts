import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthFormType } from '@/services/types';

export const useSignupForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AuthFormType>();
    const router = useRouter();

    const onSubmit = (data: AuthFormType) => {
        
        const { username, password } = data;
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            setError('username', {
                type: 'manual',
                message: 'Username already exists. Please choose a different username.'
            });
            return;
        }

        localStorage.setItem(username, JSON.stringify({ username, password }));
        router.push('/login');
    };

    return { register, handleSubmit: handleSubmit(data => onSubmit(data)), errors, setError };
};
