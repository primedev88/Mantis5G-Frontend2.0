// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const withAuth = (WrappedComponent) =>{
//   return (props) => {
//     const router = useRouter();

//     useEffect(() => {
//       const isLoggedIn = sessionStorage.getItem('isLoggedIn');
//       if (!isLoggedIn) {
//         router.push('/');
//       }
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Add display name for better debugging
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
