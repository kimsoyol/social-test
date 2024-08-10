import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface CmtProps {
  initComments: any;
}

const Comment = ({ initComments }: CmtProps) => {
  const [comments, setComments] = useState(initComments);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const newComment = formData.get("cmt") as string;

    if (newComment.trim() === "") return;

    const newCmt = {
      body: newComment,
      user: { fullName: "Current User" },
    };

    setComments([...comments, newCmt]); 
    e.currentTarget.reset();
  };

  return (
    <div>
      {comments.map((cmt: any, index: number) => (
        <div key={index} className="border border-gray-700 mt-2">
          <p>{cmt.user.fullName}</p>
          <p>{cmt.body}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="pt-2">
        <Textarea name="cmt" placeholder="Type your comment here." required/>
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Post</button>
      </form>
    </div>
  );
};
export default Comment;
