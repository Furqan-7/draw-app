import { useEffect, useState } from "react";


export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            alert("login First ");
            return;
        }
        const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        loading,
        socket
    }
}