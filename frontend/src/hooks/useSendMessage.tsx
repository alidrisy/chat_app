import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    if (!selectedConversation) return;
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error: any) {
      console.error("Error in useSendMessage Hook ", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { sendMessage, isLoading };
};

export default useSendMessage;