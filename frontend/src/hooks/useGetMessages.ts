import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConversation) return;
            setIsLoading(true);
            setMessages([]);
            try {
                const response = await fetch(`api/messages/${selectedConversation?.id}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchMessages();
    }, [selectedConversation]);
    
    return { isLoading, messages };
}

export default useGetMessages;
