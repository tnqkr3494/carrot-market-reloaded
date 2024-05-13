import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  if (room) {
    const session = await getSession();
    // 채팅방은 존재하지만 현재 로그인한 유저가 참여하고 있지 않은 채팅방을 들어가려고 할 때
    const canSee = Boolean(room.users.find((user) => user.id === session.id));
    if (!canSee) {
      return null;
    }
    return room;
  }
}

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);

  const session = await getSession();
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(room.id);
  const user = await getUserProfile();

  if (!user) {
    return notFound();
  }

  return (
    <ChatMessagesList
      initialMessages={initialMessages}
      userId={session.id!}
      chatRoomId={params.id}
      username={user.username}
      avatar={user.avatar!}
    />
  );
}
