import { useEffect, useState } from "react";


export function useSocket(){
    const [loading,setLoading] = useState(true);
    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
       const ws = new WebSocket("ws//:localhost:8080");

       ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
       }
    },[]);

    return {
        loading,
        socket
    }
}