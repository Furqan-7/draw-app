import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"


export function ChatRoomClient({
    messages,
    id
}: {
    messages: { messsage: string }[],
    id: string
}) {

    const { loading, socket } = useSocket();
    const [chats, setChats] = useState(messages);
    const [currentMessage,setCurrentMessage] = useState("");


    useEffect(() => {

        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                id: id,
            }));

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);

                setChats(c => [...c, message]);

            }
        }

    }, [loading, socket, id]);

    return <div>

        {chats.map((chat,index)=>{
            return <div key={index}>
                {chat.messsage}
            </div>
        })}

        <input type="text" placeholder="Enter Message" onChange={(e)=>{
             setCurrentMessage(e.target.value);
        }} />
        <button onClick={()=>{
              socket?.send(JSON.stringify({
                type:"chat",
                id:id,
                message:currentMessage
              }))
        }}>Send</button>

    </div>
}