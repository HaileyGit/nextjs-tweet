import { Tweet, User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "../../lib/useMutation";
import { cls } from "../../lib/utils";
import Link from "next/link";

interface TweetDetailWithUser extends Tweet {
  user: User;
  _count: {
    likes: number;
  };
}

interface TweetDetailResponse {
  ok: boolean;
  tweet: TweetDetailWithUser;
  isLiked: boolean;
}

const TweetDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [like] = useMutation(`/api/tweets/${router.query.id}/like`);

  const onLikeClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        tweet: {
          ...data.tweet,
          _count: {
            ...data.tweet._count,
            likes: data.isLiked
              ? data.tweet._count.likes - 1
              : data.tweet._count.likes + 1,
          },
        },
        isLiked: !data.isLiked,
      },
      false
    );
    like({});
  };

  return (
    <div className="w-screen h-screen p-3 bg-butter-mint">
      <div className="fixed top-5 right-5 px-4 py-2 text-xl font-bold text-butter-yellow bg-butter-red hover:bg-butter-mint hover:text-butter-yellow rounded-3xl shadow-xl cursor-pointer transition-colors">
        <Link href="/">Home</Link>
      </div>
      <div className="max-w-2xl mx-auto bg-butter-lavender border-2 p-4 rounded-lg">
        <span className="bg-butter-yellow ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs my-2.5">
          tweet
        </span>
        <div className="flex items-center px-4 py-3 space-x-3 border-b border-gray-400">
          <div className="w-10 h-10 rounded-full bg-butter-green" />
          <div>
            <p className="text-sm">{data?.tweet?.user?.name}</p>
          </div>
        </div>
        <div>
          <div className="px-4 mt-2">
            <span>{data?.tweet?.text}</span>
          </div>
          <div className="px-4 flex mt-3 space-x-5 py-2.5 border-t border-gray-400">
            <div
              className={cls(
                "flex items-center space-x-2 text-sm",
                data?.isLiked ? "text-butter-red" : ""
              )}
            >
              <button onClick={onLikeClick} className="flex items-center">
                <div>
                  <svg
                    className="w-4 h-4"
                    fill={data?.isLiked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="ml-1">like {data?.tweet?._count?.likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
