import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component, allowedRoles) => {
  return (props) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!session) {
          router.push('/api/auth/signin');
        } else if (!allowedRoles.includes(session.user.role)) {
          router.push('/unauthorized');
        }
      }
    }, [loading, session, router]);

    if (loading || !session) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;