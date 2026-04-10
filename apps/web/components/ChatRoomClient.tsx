"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"


export function ChatRoomClient({
    messages,
    id
}: {
    messages: { message: string }[],
    id: string
}) {

    const { loading, socket } = useSocket();
    const [chats, setChats] = useState(messages);
    const [currentMessage,setCurrentMessage] = useState("");

    console.log(chats);


    useEffect(() => {

        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id,
            }));

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);

                setChats(c => [...c, message]);

            }
        }

    }, [loading, socket, id]);

    return <div>
       
       <div style={{
         marginTop:40,
         marginLeft:40
       }}>
          {chats.map((chat,index)=>{
            return <div style={{
               backgroundColor:"white",
               color:"black",
               width:"max-content",
               padding:6,
               borderRadius:10,
               marginBottom:10
            }}  key={index}>
                {chat.message}
            </div>
        })}
       </div>
      

        <input style={{
            position:"absolute",
            bottom:4,
          marginTop:20,
          height:35,
          borderRadius:10,
          paddingLeft:70,
          borderColor:"black",
          borderWidth:1,
          width:"92vw"
        }} type="text" value={currentMessage} placeholder="Enter Message" onChange={(e)=>{
             setCurrentMessage(e.target.value);
        }} />
        <button style={{
            position:"absolute",
            bottom:4,
            right:0,
          marginTop:20,
          height:35,
          borderRadius:10,
          paddingLeft:10,
          borderColor:"black",
          borderWidth:1,
          width:100
        }} onClick={()=>{
              socket?.send(JSON.stringify({
                type:"chat",
                roomId: id,
                message:currentMessage
              }));
              setCurrentMessage("");
        }}>Send</button>

    </div>
}