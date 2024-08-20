import React from "react";
import withAuth from '../components/WithAuth';
import Audio from '../components/ReacodringView'
import { Box } from "@mui/material";

const dashboard = () => {
  return (
    <Box>
      <Audio/>
    </Box>
  );
};

export default withAuth(dashboard);
