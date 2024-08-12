"use client";

import { fetchPost, fetchPostCmt } from "@/app/api/postsApi";
import LikeBtn from "@/components/LikeBtn";
import Comment from "@/components/Comment";
import { useQuery } from "@tanstack/react-query";

const page = ({ params }: { params: { id: string } }) => {
  const postId = params.id;

  const {
    data: post,
    isError: postError,
    isLoading: postLoading,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });

  const {
    data: cmt,
    isError: cmtError,
    isLoading: cmtLoading,
  } = useQuery({
    queryKey: ["cmt", postId],
    queryFn: () => fetchPostCmt(postId),
  });

  if (postLoading)
    return (
      <div className="mx-auto mt-80 max-w-lg text-center">Loading Post...</div>
    );
  if (postError)
    return (
      <div className="mx-auto mt-80 max-w-lg text-center">
        Error loading post
      </div>
    );

  if (cmtLoading) return <div>Loading Comments...</div>;
  if (cmtError) return <div>Error loading comments</div>;

  // console.log(cmt);

  return (
    <div className="max-w-xl mx-auto pt-8">
      <p className="pb-4">
        {post.id} - {post.title}
      </p>
      <p>{post.body}</p>
      <LikeBtn initialLiked={false} initialLikeCount={post.reactions.likes} contentOwnerId={post.userId}/>
      <Comment initComments={cmt.comments} />
    </div>
  );
};
export default page;
