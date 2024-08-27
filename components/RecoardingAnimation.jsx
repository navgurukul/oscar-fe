import React from "react";
import { Box } from "@mui/material";

const VideoLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        paddingInline: {
          xs: "20px", // Small screens
          sm: "50px", // Medium screens
          md: "75px", // Larger screens
          lg: "100px", // Extra large screens
        },
      }}
    >
      <img
        src="/Animation%20-%201723024495535.gif"
        alt="Loading animation"
        style={{
          width: "100px", // Default size
          height: "100px",
          objectFit: "cover",
          "@media (min-width: 600px)": {
            width: "150px", // Larger size for medium screens and up
            height: "150px",
          },
        }}
      />
    </Box>
  );
};

export default VideoLoader;

