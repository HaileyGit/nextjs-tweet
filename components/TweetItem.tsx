import Link from "next/link";
import { Tweet, User } from "@prisma/client";

interface TweetWithCount extends Tweet {
  _count: {
    likes: number;
  };
  user: User;
}

interface TweetItemProps {
  tweet: TweetWithCount;
  formatDate: (dateString: string) => string;
}

const TweetItem: React.FC<TweetItemProps> = ({ tweet, formatDate }) => {
  return (
    <Link href={`/tweet/${tweet.id}`} className="block">
      <div className="flex flex-col items-start p-4 border-2 cursor-pointer bg-amber-50 rounded-lg">
        <span className="ml-4 flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-butter-yellow text-gray-800">
          tweet
        </span>
        <div className="mt-2 text-gray-700">{tweet.text}</div>
        <div className="flex items-center justify-between w-full mt-5 text-xs md:text-sm font-medium text-gray-500">
          <span>{tweet.user.name}</span>
          <span>{formatDate(tweet.updatedAt)}</span>
        </div>
        <div className="flex space-x-5 mt-3 py-2.5 border-t w-full">
          <span className="flex items-center space-x-2 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
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
            <span>{tweet._count.likes} likes</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TweetItem;
