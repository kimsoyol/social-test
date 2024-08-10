import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Posts from "./PostsList";
import PostList from "./PostsList";

// import { useState, useEffect, useCallback } from "react";

const page = async () => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["posts"],
  //   queryFn: getPosts,
  // });

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [index, setIndex] = useState(2);

  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ["postData"],
  //   queryFn: async () => {
  //     const res = await fetch("https://dummyjson.com/posts");
  //     return await res.json();
  //   },
  // });

  return (
    <PostList />
  );
};
export default page;
