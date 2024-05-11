"use client";

import { disLikePost, likePost } from "@/app/posts/[id]/action";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";

interface ILikeButton {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: ILikeButton) {
  const onClick = async () => {
    if (isLiked) {
      await disLikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
          isLiked
            ? "bg-orange-500 text-white border-orange-500"
            : "hover:bg-neutral-800"
        }`}
      >
        {isLiked ? (
          <HandThumbUpIcon className="size-5" />
        ) : (
          <OutlineHandThumbUpIcon className="size-5" />
        )}
        <span>{likeCount}</span>
      </button>
    </div>
  );
}
