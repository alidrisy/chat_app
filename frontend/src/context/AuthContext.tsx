import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type AuthUsertype = {
    id: string;
    username: string;
    profilePic: string;
    gender: string;
};

const AuthContext = createContext<{
    authUser: AuthUsertype | null;
    setAuthUser: Dispatch<SetStateAction<AuthUsertype | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUsertype | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('api/auth/me', { credentials: 'include' });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setAuthUser(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }
    , []);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
}
