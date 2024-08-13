import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();


    const signup = async (inputs: {
        fullName: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: string;
    }) => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/auth/signup", {
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

    return { isLoading, signup };
}

export default useSignup;

