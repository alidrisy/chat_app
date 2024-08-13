import { useContext, useState, useEffect, createContext, ReactNode, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface ISocketContext {
    onlineUsers: string[];
    socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({ onlineUsers: [], socket: null });

const socketUrl = import.meta.env.VITE_SOCKET_URL as string;

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const { authUser, isLoading } = useAuthContext();

    useEffect(() => {
        if (authUser && !isLoading) {
            socketRef.current = io("http://localhost:3000", {
                query: {
                    userId: authUser.id,
                },
            });

            socketRef.current.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                socketRef.current?.close();
                socketRef.current = null;
            };
        }
    }, [authUser, isLoading]);

    return (
        <SocketContext.Provider value={{ onlineUsers, socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
}


export const useSocketContext = (): ISocketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return context;
};

