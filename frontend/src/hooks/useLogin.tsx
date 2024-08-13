import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (inputs: { username: string; password: string }) => {
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
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

export default useLogin;