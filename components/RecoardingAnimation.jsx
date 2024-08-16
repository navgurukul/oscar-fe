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
        paddingInline: "100px",
      }}
    >
      <img
        src="/Animation%20-%201723024495535.gif"
        alt="Loading animation"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default VideoLoader;
