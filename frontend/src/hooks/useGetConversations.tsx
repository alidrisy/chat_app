import { useEffect, useState } from "react";
import { ConversationType } from "../zustand/useConversation";

const useGetConversations = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("api/messages/conversations", {
                    credentials: "include",
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }
    , []);

    return { isLoading, conversations };

}

export default useGetConversations;
