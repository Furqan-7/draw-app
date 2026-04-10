import axios from "axios";
import { ChatRoom } from "../../../components/ChatRoom";


async function getRoomId(slug: string) {

      const response = await axios.get(`http://localhost:3001/room/${slug}`);
      return response.data.room.id;
}


export default async function ChatRoom1({ params }: { params: Promise<{ slug: string }> }) {

      const resolvedParams = await params;
      const slug = resolvedParams.slug;
      const RoomId = await getRoomId(slug);

      return <div>
            <ChatRoom id={RoomId} />
      </div>
}