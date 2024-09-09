import React from "react";
import { Typography, Container, Button, Grid, Paper, Box } from "@mui/material";
import Image from "next/image";

const HowWork = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        padding: "80px 0px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <Box>
        <Typography variant="h5" textAlign="center">
          How it works?
        </Typography>
      </Box>
      <Box>
        <Grid container align="center" spacing={3} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Grid item xs={12} md={4}>
            <Box>
              <Box>
                <Image
                  src="/images/Group.svg"
                  alt="Get it on Google Play"
                  width={150}
                  height={150}
                />
              </Box>
              <Typography variant="h6">Speak your thoughts</Typography>
              <Typography variant="body1">
                Simply speak and let your voice express your ideas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Box>
                <Image
                  src="/images/Frame(2).svg"
                  alt="Get it on Google Play"
                  width={150}
                  height={150}
                />
              </Box>

              <Typography variant="h6">Let AI do its magic</Typography>
              <Typography variant="body1">
                Our AI instantly converts your spoken words into clear, polished
                text
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Box>
                <Image
                  src="/images/Frame (1).svg"
                  alt="Get it on Google Play"
                  width={150}
                  height={150}
                />
              </Box>
              <Typography variant="h6">Save your text</Typography>
              <Typography variant="body1">
                Save your perfectly formatted text with a single click
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HowWork;
