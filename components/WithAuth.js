import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader'; 

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const googleToken = localStorage.getItem('googleToken');

      if (!googleToken) {
        router.push('/'); 
      } else {
        setLoading(false); 
      }
    }, [router]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
