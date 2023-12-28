import { useForm } from 'react-hook-form';
import { AuthFormType } from '@/services/types';
import { useRouter } from 'next/navigation';

export const useLoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AuthFormType>();

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

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
