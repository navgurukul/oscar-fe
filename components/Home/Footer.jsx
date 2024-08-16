import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#4D4D4D",
        paddingBlock: "20px",
      }}
    >
      <Typography>Oscar</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "30px",
        }}
      >
        <Typography variant="body1" textAlign="center">
          Privacy Policy
        </Typography>
        <Typography variant="body1" textAlign="center">
          Terms of Use
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
