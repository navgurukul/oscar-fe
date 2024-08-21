import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/SignupPage.module.css";
import axios from "axios";
import Loader from "./Loader"; 

const GoogleLoginComponent = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignIn = async (credentialResponse) => {
    setLoading(true);
    const idToken = credentialResponse.credential;
    console.log(idToken)
    try {
      // Send the idToken to your backend API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login/google`,
        {
          idToken: idToken,
        }
      );
      // Handle the response from your backend API
      // console.log(response.data.data)
      // console.log(response.data.data.token,"Hello",response.data.data.user)
      localStorage.setItem("googleToken", response.data.data.token);
      localStorage.setItem("googleUser", JSON.stringify(response.data.data));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLoginFail = (errorResponse) => {
    console.error("Google login failed:", errorResponse);
    setLoading(false); // Set loading state to false on failure
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: styles.dialogPaper }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography variant="h6" color="gray">
          To start recording Login first to continue
        </Typography>
      </DialogTitle>
      <DialogContent>
        {loading && (
          <Box className={styles.loaderContainer}>
            <Loader />
          </Box>
        )}
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <GoogleLogin
            onSuccess={onSignIn}
            onError={onGoogleLoginFail}
            useOneTap
            render={(renderProps) => (
              <Button
                variant="contained"
                onClick={renderProps.onClick}
                sx={{ mt: 2, paddingInline: 5 }}
              >
                <Image
                  src="/images/Google Logo.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%", marginInline: "10px" }}
                />
                Log in with Google
              </Button>
            )}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default GoogleLoginComponent;















