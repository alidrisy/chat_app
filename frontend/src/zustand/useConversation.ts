import { create } from 'zustand';


export type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
};

export type MessagesType = {
    id: string;
    body: string;
    senderId: string;
    conversationId: string;
    createdAt: string;
};


interface ConversationState {
    selectedConversation: ConversationType | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    messages: MessagesType[];
    setMessages: (messages: MessagesType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;
