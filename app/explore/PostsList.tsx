// app/posts/PostList.tsx
"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Post from "./Post";

const fetchPosts = async ({ pageParam = 1 }) => {
  console.log(pageParam);
  
  const response = await fetch(
    `https://dummyjson.com/posts?limit=10&skip=${(pageParam - 1) * 10}`
  );
  return await response.json();
};

export default function PostList() {
  // const [page, setPage] = useState(1);
  // const [posts, setPosts] = useState([]);

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div className="max-w-xl mx-auto">
     {data?.pages.map((page) =>
        page.posts.map((post: any) => <Post key={post.id} post={post} />)
      )}
      {isFetchingNextPage && <div>Loading more posts...</div>}
    </div>
  );
}
