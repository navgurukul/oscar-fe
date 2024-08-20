import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import { Box } from '@mui/material';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
      router.replace('/');
  }, [router]);

  return (
    <Box>
     <Loader/>
    </Box>
  );
};

export default ErrorPage;
