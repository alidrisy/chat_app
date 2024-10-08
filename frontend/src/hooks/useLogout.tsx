import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(null);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, logout };
};

export default useLogout;