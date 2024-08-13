import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();


    const login = async (inputs: {
        username: string;
        password: string;
    }) => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(data);
        } catch (err: any) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, login };
}

export default useLogin;

