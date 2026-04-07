import axios from "axios"



async function getChats(RoomId:number){

    const Response = await axios.get(`http://localhost:3001/chats/${RoomId}`);
    return Response.data.message;
    
}


export async   function ChatRoom(id:number){

    const chats = await  getChats(id);


    return <div>

    </div>
}