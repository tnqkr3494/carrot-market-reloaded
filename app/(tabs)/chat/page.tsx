import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";

interface ChatRoomInfo {
  id: string;
  users: {
    id: number;
    username: string;
    avatar?: string;
  }[];
}

async function getUserChats(id: number): Promise<ChatRoomInfo[]> {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      chat_rooms: {
        include: {
          users: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.chat_rooms.map((chatRoom) => ({
    id: chatRoom.id,
    users: chatRoom.users.map((user) => ({
      id: user.id,
      username: user.username,
    })),
  }));
}

export default async function Chat() {
  const session = await getSession();
  const userChats = await getUserChats(session.id!);

  return (
    <div className="p-5">
      <h1 className="text-white text-4xl mb-5">Chat!</h1>
      <div className="flex flex-col gap-5">
        {userChats.map((chatRoom, idx) => (
          <Link
            key={idx}
            href={`/chats/${chatRoom.id}`}
            className="text-white text-2xl font-semibold border-b-2 pb-5"
          >
            <span>{chatRoom.users[1].username}과의 </span>
            <span>채팅방 {idx + 1}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
