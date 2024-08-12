import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};


export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

