import React from "react";
import { Typography, Container, Button, Grid, Paper, Box } from "@mui/material";
import Image from "next/image";

const HowWork = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" pt={10} pb={5}>
        How it works?
      </Typography>
      <Box display="flex" justifyContent="center" pb={4}>
        <Image src="/images/Arrow 4.svg" alt="Arrow" width={100} height={100} />
      </Box>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame (1).png"
              alt="Get it on Google Play"
              width={150}
              height={150}
            />
            <Typography variant="h6">Speech your thoughts</Typography>
            <Typography variant="body2">
              Simply talk, and let your voice express your ideas.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame.png"
              alt="Get it on Google Play"
              width={150}
              height={150}
            />
            <Typography variant="h6">Let AI do its magic</Typography>
            <Typography variant="body2">
              Our AI instantly converts your spoken words into clear, polished
              text.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Image
              src="/images/Frame (2).png"
              alt="Get it on Google Play"
              width={150}
              height={150}
            />
            <Typography variant="h6">Download your text</Typography>
            <Typography variant="body2">
              Save your perfectly formatted text with a single click.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowWork;
