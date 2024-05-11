"use client";

import { disLikePost, likePost } from "@/app/posts/[id]/action";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";

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
    reducerFn(undefined);
    if (isLiked) {
      await disLikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  // optimistic : react hook, 말그대로 낙관적으로 생각하는 것.
  // 데이터베이스 통신요청이 느려서 즉각적으로 동작하지 못해 느려질 수 있지만 사용자에게 바로 값을 띄어주고 싶을 때(비교적 데이터 중요도가 낮을 때)
  // ex) 로그인같은 부분은 느려도 기다리는게 맞지만 좋아요 수는 비교적 덜 중요한 정보이기 때문에 이 hook을 사용해도 괜찮다.
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
          state.isLiked
            ? "bg-orange-500 text-white border-orange-500"
            : "hover:bg-neutral-800"
        }`}
      >
        {state.isLiked ? (
          <HandThumbUpIcon className="size-5" />
        ) : (
          <OutlineHandThumbUpIcon className="size-5" />
        )}
        <span>{state.likeCount}</span>
      </button>
    </div>
  );
}
