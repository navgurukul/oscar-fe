import React from "react";
import {
  Typography,
  Container,
  Button,
  Grid,
  Paper,
  Box,
  TextField,
} from "@mui/material";

const ContactSection = () => {
  return (
    <Container maxWidth="lg" sx={{pt:"25px"}}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="left"
            >
              Contact us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Do you have any doubts or feedback for us. Please fill out the
              form, and we’ll get back to you as soon as possible
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form">
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="First Name" variant="outlined" fullWidth />
              <TextField label="Last Name" variant="outlined" fullWidth />
            </Box>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
            />
            <Button variant="contained" color="primary" type="submit" sx={{marginTop:"15px",marginBottom:"20px"}}>
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactSection;
