import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeBtn from "@/components/LikeBtn";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-currrent-user";


interface CmtProps {
  initComments: any;
}

const Comment = ({ initComments }: CmtProps) => {
  const [comments, setComments] = useState(initComments);
  const user = useCurrentUser()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newComment = formData.get("cmt") as string;

    if (newComment.trim() === "") return;

    const newCmt = {
      body: newComment,
      user: { fullName: user?.email },
    };

    setComments([...comments, newCmt]);
    e.currentTarget.reset();
  };

  return (
    <div>
      {comments.map((cmt: any, index: number) => (
        <div key={index} className=" mt-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>{cmt.user.fullName}</p>
              <p>{cmt.body}</p>
            </div>
          </div>
          <LikeBtn initialLikeCount={cmt.likes} initialLiked={false} contentOwnerId={cmt.user.id}/>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-2">
        <Textarea name="cmt" placeholder="Type your comment here." required />
        <Button type="submit" className="mt-2">
          Post
        </Button>
      </form>
    </div>
  );
};
export default Comment;
