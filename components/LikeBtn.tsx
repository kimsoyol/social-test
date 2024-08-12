import { useCurrentUser } from "@/hooks/use-currrent-user";
import { useState } from "react";

interface LikeButtonProps {
  initialLiked: boolean;
  initialLikeCount: number;
  onToggle?: (liked: boolean) => void;
  contentOwnerId: string;
}

const LikeBtn = ({
  initialLiked,
  initialLikeCount,
  contentOwnerId,
  onToggle,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const user = useCurrentUser()


  const toggleLike = () => {
    if (contentOwnerId === user?.id) {
      // Prevent like action if the content owner is the same as the user
      return;
    }
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(likeCount + (newLikedState ? 1 : -1));
    if (onToggle) {
      onToggle(newLikedState);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleLike}
        className="flex items-center justify-center p-2 rounded-full hover:bg-red-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={liked ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className={`w-6 h-6 ${liked ? "text-red-500" : "text-gray-500"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21c-.597 0-1.175-.15-1.688-.433a5.963 5.963 0 01-2.126-1.463c-2.51-2.502-4.376-5.149-5.676-7.938A9.364 9.364 0 012 6.511C2 3.927 4.239 2 6.827 2c1.623 0 3.133.844 4.173 2.197A6.5 6.5 0 0115.827 2C18.415 2 20 3.927 20 6.511c0 2.15-1.516 4.315-4.01 6.783-1.3 1.289-2.686 2.451-4.073 3.39a7.007 7.007 0 01-1.917 1.066C12.618 20.852 12.31 21 12 21z"
          />
        </svg>
      </button>
      <p className="ml-2">{likeCount}</p>
    </div>
  );
};
export default LikeBtn;
