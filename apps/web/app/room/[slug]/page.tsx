import axios from "axios";


async function getRoomId(slug: string) {
    const response = await axios.post(`http://localhost:3001/room/${slug}`);
    return response.data.roomId;
}


export default async function ChatRoom({params}: {params: {slug: string}}) {
    

   const slug = params.slug;
   const RoomId = await  getRoomId(slug);

      return <div>
          
      </div>
}