export async function getPosts() {
  const res = await fetch("https://dummyjson.com/posts?limit=5&skip=5");
  return await res.json();
}
