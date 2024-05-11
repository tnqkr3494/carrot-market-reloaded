import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getPost(id: number) {
  console.log("post db");
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = unstable_cache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number) {
  console.log("like db");

  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}
function getCachedLikeStatus(postId: number) {
  const cachedOperation = unstable_cache(
    getLikeStatus,
    ["product-like-status"],
    { tags: [`like-status-${postId}`] }
  );
  return cachedOperation(postId);
}
export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-2">
        <div>
          {post.user.avatar ? (
            <Image
              width={28}
              height={28}
              src={post.user.avatar}
              alt={post.user.username}
              className="size-10 rounded-full"
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <span>{post.user.username}</span>
          <span>{formatToTimeAgo(String(post.created_at))}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">{post.title}</p>
        <p>{post.description}</p>
      </div>
      <div className="flex items-center gap-5 text-neutral-400">
        <EyeIcon className="size-7" />
        <span>조회 {post.views}</span>
      </div>
      <LikeButton likeCount={likeCount} isLiked={isLiked} postId={post.id} />
    </div>
  );
}
