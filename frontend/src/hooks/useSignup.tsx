import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    type InputsType = {
        fullName: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: string;
    }

    const signup = async (inputs: InputsType, setInputs: (inputs: InputsType) => void) => {
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
            setInputs({
                fullName: "",
                username: "",
                password: "",
                confirmPassword: "",
                gender: "",
            })
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, signup };
}

export default useSignup;

