"use client"
import axios from "axios"
import { ChatRoomClient } from "./ChatRoomClient";
import { useEffect, useState } from "react";


export function ChatRoom({ id }: { id: string }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Login First");
            return;
        }
        axios.get(`http://localhost:3001/chats/${id}`, {
            headers: {
                token: token
            }
        }).then((res) => {
            setChats(res.data.message);
            console.log(res.data.message);
        }).catch((e) => {
            console.error("Failed to fetch chats", e);
        });
    }, [id]);

    return <div>
        <ChatRoomClient messages={chats} id={id} />
    </div>
}