import LikeBtn from "@/components/LikeBtn";
import Link from "next/link";


export default function Post({ post }: { post: any }) {

  return (
    <div className="py-4">
      <p className="pb-2">
        {post.id} - {post.title}
      </p>
      <p>{post.body}</p>
      <LikeBtn initialLiked={false} initialLikeCount={post.reactions.likes} />
      <Link href={`/explore/${post.id}`}>Comment</Link>
    </div>
  );
}
