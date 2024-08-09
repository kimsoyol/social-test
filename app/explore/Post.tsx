// app/posts/PostItem.tsx
export default function Post({ post }: { post: any }) {
  return (
    <div className="py-4">
      <h2>{post.id} - {post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
