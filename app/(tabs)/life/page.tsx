import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export default async function Life() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col p-5 gap-5">
      {posts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="flex flex-col gap-2 border-b-2 pb-5 last:border-b-0 last:pb-0 text-neutral-400"
        >
          <h2 className="text-2xl text-white">{post.title}</h2>
          <p>{post.description}</p>
          <div className="flex justify-between items-center *:flex text-sm">
            <div className="gap-5">
              <span>{formatToTimeAgo(String(post.created_at))}</span>
              <span>·</span>
              <span>조회 {post.views}</span>
            </div>
            <div className="*:flex items-center *:items-center gap-5 *:gap-1">
              <span>
                <HandThumbUpIcon className="size-5" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-5" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
