export const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://dummyjson.com/posts?limit=10&skip=${(pageParam - 1) * 10}`
  );
  return await response.json();
};

export const fetchPost = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  return await response.json();
};

export const fetchPostCmt = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  return await response.json();
};
