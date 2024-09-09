import React, { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import GoogleLoginComponent from "@/components/GoogleLogin";

const LoginSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 0",
        // gap: isSmallScreen ? "1rem" : "2.5rem",
      }}
    >
      <Box align="center">
        <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        >
          <Typography
            // variant={isSmallScreen ? "h4" : isMediumScreen ? "h4" : "h3"}
            variant="h3"
            // fontSize={isSmallScreen ? 40 : isMediumScreen ? 55 : 70}
            // pt={isSmallScreen ? 2 : 6}
          >
            Speak it
            <span style={{ color: "#51A09B" }}>.</span> See it
            <span style={{ color: "#51A09B" }}>.</span> Save it or Share it
            <span style={{ color: "#51A09B" }}>.</span>
            {/* Effortlessly<span style={{ color: "#51A09B" }}>.</span> */}
          </Typography>
          <Typography
            // variant={isSmallScreen ? "h4" : isMediumScreen ? "h4" : "h3"}
            variant="h3"
            // fontSize={isSmallScreen ? 40 : isMediumScreen ? 55 : 70}
            color="#51A09B"
          >
            Effortlessly<span style={{ color: "#51A09B" }}>.</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt:"32px"
            // gap: isSmallScreen ? "5px" : "10px",
          }}
        >
          <Typography variant="h6">
            Speak and watch your ideas seamlessly flow into polished text
          </Typography>
          <Typography variant="body1">
            Whether it's notes, emails, or articles, all you need to do is
            Speak
          </Typography>
          <Typography variant="body1">We'll handle the rest</Typography>
        </Box>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            paddingInline: isSmallScreen ? 3 : 5,
            // paddingBlock: 1,
            mt: 3.5,
          }}
          onClick={handleClickOpen}
        >
          <Image
            src="/images/Google Logo.svg"
            alt="Get it on Google Play"
            width={25}
            height={25}
            style={{ borderRadius: "50%", marginInline: "10px" }}
          />
          Log in with Google
        </Button>
      </Box>

      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Box>
  );
};

export default LoginSection;
