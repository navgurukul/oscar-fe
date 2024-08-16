import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
      router.replace('/');
  }, [router]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20%" }}>This page is not Found</h1>
    </div>
  );
};

export default ErrorPage;
