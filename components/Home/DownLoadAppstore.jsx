import React from "react";
import { Typography, Container, Button, Grid, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DownLoadAppstore = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 0",
        gap: "32px",
        backgroundColor: "#B9D9D7",
      }}
    >
      <Box>
        <Typography variant="h5" textAlign="center">
          Try transcription on the go with the Oscar App
        </Typography>
      </Box>
      <Box>
        <Link
          href="https://play.google.com/store/apps/details?id=org.samyarth.oscarai.release"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/Google Play.svg"
            alt="Get it on Google Play"
            width={150}
            height={55}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default DownLoadAppstore;
