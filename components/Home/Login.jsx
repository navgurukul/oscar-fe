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
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Typography
        variant="h3"
        align="center"
        fontSize={50}
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
        pt={-3}
      >
        Effortlessly<span style={{ color: "#51A09B" }}>.</span>
      </Typography>
      <Box>
        <Typography
          variant="h5"
          mt={6}
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
          paddingInline={28}
          mt={4}
        >
          Whether it’s notes, emails, or articles, all you need to do is talk.
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="lighter"
          fontFamily="'DM Sans', sans-serif"
          mt={2}
        >
          We’ll handle the rest.
        </Typography>
      </Box>
      <Grid container justifyContent="center" sx={{ my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ paddingInline: 5, mt: 4 }}
          onClick={handleClickOpen}
        >
          <Image
            src="/images/Google Logo.png"
            alt="Get it on Google Play"
            width={20}
            height={20}
            style={{ borderRadius: "50%", marginInline: "10px" }}
          />
          Log in with Google
        </Button>
      </Grid>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Container>
  );
};

export default LoginSection;
