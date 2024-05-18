import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) =>{
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

