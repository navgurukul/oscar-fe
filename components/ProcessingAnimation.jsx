
import React from "react";
import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";

const VideoLoader = ({ time }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Almost done...
      </Typography>
      <Image
        src="/images/NewFrame.png"
        width={100}
        height={100}
        alt="Processing Image"
      />
      <Box sx={{ width: "60%", margin: "20px auto", maxWidth: 300 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      <Typography variant="body1" sx={{ color: "#4D4D4D" }}>
        Please wait a moment while we prepare the text for you...
      </Typography>
    </Box>
  );
};

export default VideoLoader;
