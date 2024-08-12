"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Post from "./Post";
import { fetchPosts } from "@/app/api/postsApi";

export default function PostList() {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= Math.ceil(lastPage.total / 10) ? nextPage : undefined;
    },
  });

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage]);

  if (isLoading)
    return <div className="mx-auto mt-80 max-w-lg text-center">Loading...</div>;
  if (isError)
    return (
      <div className="mx-auto mt-80 max-w-lg text-center">
        Error loading posts
      </div>
    );

  return (
    <div className="max-w-xl mx-auto">
      {data?.pages.map((page) =>
        page.posts.map((post: any) => <Post key={post.id} post={post} />)
      )}
      {isFetchingNextPage && <div>Loading more posts...</div>}
    </div>
  );
}
