import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import withAuth from '../components/WithAuth';
import ReacodringView from '../components/ReacodringView';
import { useRouter } from "next/router";

const Dashboard = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if there's a message in the URL
    const { message } = router.query;
    if (message) {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      // Clear the message from URL after reading
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [router.query]);

  return (
    <Box>
      <ReacodringView />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // 3 seconds
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default withAuth(Dashboard);
