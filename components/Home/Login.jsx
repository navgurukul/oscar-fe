import React, { useState } from "react";
import { Typography, Container, Button, Grid, Box } from "@mui/material";
import Image from "next/image";
import GoogleLoginComponent from "@/components/GoogleLogin";

const LoginSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <Box
      style={{
        // height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap:"2.5rem"
      }}
    >
      <Box>
        <Typography
          variant="h3"
          align="center"
          fontSize={70}
          fontWeight={600}
          fontFamily="Fraunces, sans-serif"
          pt={6}
          gutterBottom
        >
          Say it
          <span style={{ color: "#51A09B" }}>.</span> See it
          <span style={{ color: "#51A09B" }}>.</span> Save it or Share it
          <span style={{ color: "#51A09B" }}>.</span>
        </Typography>
        <Typography
          variant="h3"
          align="center"
          fontSize={50}
          fontWeight={400}
          fontFamily="cursive"
        >
          Effortlessly<span style={{ color: "#51A09B" }}>.</span>
        </Typography>
      </Box>

      <Box style={{display:"flex", flexDirection:"column", gap:"10px"}}>
        <Typography
          variant="h5"
          textAlign="center"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="bold"
        >
          Speak, and watch your ideas seamlessly flow into polished text.
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="lighter"
          fontFamily="'DM Sans', sans-serif"
        >
          Whether it's notes, emails, or articles, all you need to do is talk.
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="lighter"
          fontFamily="'DM Sans', sans-serif"
        >
          We'll handle the rest.
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ paddingInline: 5, paddingBlock: 1, mt:5 }}
          onClick={handleClickOpen}
        
        >
          <Image
            src="/images/Google Logo.png"
            alt="Get it on Google Play"
            width={25}
            height={25}
            style={{ borderRadius: "50%", marginInline: "10px" }}
          />
          Log in with Google
        </Button>
      </Grid>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Box>
  );
};

export default LoginSection;
