// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const isSignedIn = (WrappedComponent)=>{
//     return (props) => {
//         const router = useRouter();

//         useEffect(() => {
//             const isLoggedIn = sessionStorage.getItem('isLoggedIn');
//             if (isLoggedIn) {
//             router.push('/dashboard');
//             }
//         }, [router]);

//         return <WrappedComponent {...props} />;
//     };
// };

// export default isSignedIn;

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isSignedIn = (WrappedComponent) => {
  const ComponentWithSignIn = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        router.push('/dashboard');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Add display name for better debugging
  ComponentWithSignIn.displayName = `isSignedIn(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithSignIn;
};

export default isSignedIn;
