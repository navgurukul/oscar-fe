import React from "react";
import { Typography, Container, Button, Grid, Box } from "@mui/material";
import Image from "next/image";

const DownLoadAppstore = () => {
  return (
    <Grid justifyContent="center" sx={{ backgroundColor: "#B9D9D7" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBlock: "40px",
          mt:4
        }}
      >
        <Typography variant="h6" fontWeight={700} textAlign="center">
          Try Transcription on the Go via Oscar App
        </Typography>
        <Image
          src="/images/Google Play.png"
          alt="Get it on Google Play"
          width={200}
          height={60}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "150px",
            border: "none",
          }}
        />
      </Box>
    </Grid>
  );
};

export default DownLoadAppstore;
