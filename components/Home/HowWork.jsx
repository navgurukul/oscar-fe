import React from "react";
import { Typography, Container, Button, Grid, Paper,Box } from "@mui/material";
import Image from "next/image";

const HowWork = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" mt={7} textAlign="center" pb={2}>
        How it works?
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame (1).png"
              alt="Get it on Google Play"
              width={100}
              height={100}
            />
            <Typography variant="h6">Speech your thoughts</Typography>
            <Typography variant="body2">
              You can download our app from Google Play or AppStore.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame.png"
              alt="Get it on Google Play"
              width={100}
              height={100}
            />
            <Typography variant="h6">Let AI Do its magic</Typography>
            <Typography variant="body2">
              You can download our app from Google Play or AppStore.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame (2).png"
              alt="Get it on Google Play"
              width={100}
              height={100}
            />
            <Typography variant="h6">Download Text</Typography>
            <Typography variant="body2">
              You can download our app from Google Play or AppStore.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowWork;
