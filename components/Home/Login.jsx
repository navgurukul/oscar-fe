import React, { useState } from "react";
import { Typography, Container, Button, Grid,Box} from "@mui/material";
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
    <Container maxWidth="lg" sx={{pt:2}}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        {/* Speech to Text - Voice Typing & Transcription */}
        Say it. See it. Save it or Share it.
      </Typography>
      <Box>
      <Typography variant="body1" align="center" fontWeight={700}>
      Speak, and watch your ideas seamlessly flow into polished text.
      </Typography>
      <Typography variant="body1" align="center" fontWeight={700}>
        {/* video recordings. Secure, accurate & blazing fast. */}
        Whether it’s notes, emails, or articles, all you need to do is talk. We’ll handle the rest

      </Typography>
      </Box>
      <Grid container justifyContent="center" sx={{ my: 4}}>
          <Button
            variant="contained"
            color="primary"
            sx={{paddingInline: 5 }}
            onClick={handleClickOpen}
          >
            <Image
              src="/images/Google Logo.png"
              alt="Get it on Google Play"
              width={20}
              height={20}
              style={{ borderRadius: "50%", marginInline: "10px"}}
            />
            Log in with Google
          </Button>
      </Grid>
      <GoogleLoginComponent open={dialogOpen} onClose={handleClose} />
    </Container>
  );
};

export default LoginSection;









