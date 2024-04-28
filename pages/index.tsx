import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { NextPage } from "next";
import { Tweet, User } from "@prisma/client";
import LogoutButton from "../components/LogoutButton";
import UploadButton from "../components/UploadButton";
import TweetItem from "../components/TweetItem";

interface TweetWithCount extends Tweet {
  _count: {
    likes: number;
  };
  user: User;
}

interface TweetResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data: userData, error } = useSWR<any>("/api/users/me");
  const { data } = useSWR<TweetResponse>("/api/tweets");

  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    if (error) {
      router.replace("/log-in");
    }
  }, [router, error]);

  if (!userData) {
    return <div />;
  }

  return (
    <div className="p-3 bg-butter-lavender max-w-4xl mx-auto">
      <div className="flex justify-between p-3 mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Hello {userData?.name}!
        </h1>
        <LogoutButton />
      </div>
      <div className="space-y-4">
        {data?.tweets?.map((tweet) => (
          <TweetItem key={tweet.id} tweet={tweet} formatDate={formatDate} />
        ))}
      </div>
      <UploadButton />
    </div>
  );
};

export default Home;
