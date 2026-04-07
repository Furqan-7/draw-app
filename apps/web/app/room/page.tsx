"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {

    const [roomid, setRoomId] = useState("");
    const Naviaget = useRouter();


    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <div style={{
            paddingTop: 200
        }}>
            <input onChange={(e) => {
                setRoomId(e.target.value);
            }} style={{
                marginTop: 20,
                height: 35,
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: "black",
                borderWidth: 1,
                width: 230
            }} type="text" placeholder="Enter Room id " />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                paddingLeft: 40,
                paddingRight: 40,
                gap: 10
            }}>
                <div>
                    <button onClick={() => {
                        if (roomid != "") {
                            Naviaget.push(`/room/${roomid}`);
                        }
                        else {
                            alert("Add Room id ");
                        }
                    }} style={{
                        fontSize: 17,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "black",
                        marginLeft: 45
                    }}>Join</button>
                </div>

            </div>

        </div>

    </div>
}