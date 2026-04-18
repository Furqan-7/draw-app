"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"create" | "join">("create");
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      alert("Room name is required");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.post(
        "http://localhost:3002/room",
        {
          slug: roomName,
          description: description,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      console.log("Create Room Response:", response.data);

      if (response.data.roomId) {
        router.push(`/canvas/${response.data.roomId}`);
      }
    } catch (error) {
      alert("Failed to create room. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!slug.trim()) {
      alert("Room slug is required");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.post(
        `http://localhost:3002/room`,
        {
          slug: slug,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.Exits === true && response.data.roomId) {
        router.push(`/canvas/${response.data.roomId}`);
      }
    } catch (error) {
      alert("Room not found. Please check the slug and try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .form-content {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black transition-all duration-300">
            {mode === "create" ? "Create Room" : "Join Room"}
          </h1>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setMode("create")}
            className={`py-2 px-6 rounded-lg font-semibold transition-all duration-300 ease-out ${
              mode === "create"
                ? "bg-black text-white border-2 border-black shadow-md"
                : "bg-gray-100 text-black border-2 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Create
          </button>
          <button
            onClick={() => setMode("join")}
            className={`py-2 px-6 rounded-lg font-semibold transition-all duration-300 ease-out ${
              mode === "join"
                ? "bg-black text-white border-2 border-black shadow-md"
                : "bg-gray-100 text-black border-2 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Join
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div className="form-content">
            <div className="flex flex-col gap-4">
              {mode === "create" ? (
                <>
                  <input
                    value={roomName}
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter room name"
                    className="h-12 border-2 border-black rounded-lg px-4 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                  />

                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Enter room description (optional)"
                    className="h-24 border-2 border-black rounded-lg px-4 py-3 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black resize-none transition-all duration-200"
                  />
                </>
              ) : (
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter room slug"
                  className="h-12 border-2 border-black rounded-lg px-4 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={mode === "create" ? handleCreateRoom : handleJoinRoom}
            disabled={loading}
            className="bg-black text-white font-semibold text-base py-3 px-8 rounded-lg border-2 border-black hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? mode === "create"
                ? "Creating..."
                : "Joining..."
              : mode === "create"
                ? "Create Room"
                : "Join Room"}
          </button>
        </div>

        <div className="text-center mt-6 text-sm transition-all duration-300">
          <p className="text-black">
            {mode === "create"
              ? "Want to join an existing room? Switch to join mode above."
              : "Want to create a new room? Switch to create mode above."}
          </p>
        </div>
      </div>
    </div>
  );
}
