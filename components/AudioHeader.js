import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import ProfileDialog from "./ProfileDialog";
import { Box } from "@mui/system";
import Link from "next/link";

const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user) {
      setUserDetails(user.user);
    }
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Box display="flex" alignItems="center">
          <Link href="https://oscar.samyarth.org" passHref>
            <Image
              src="/images/Oscar Logo with Text.svg"
              alt="Oscar Logo"
              width={60}
              height={60}
            />
          </Link>
          {/* <Typography variant="h4" color="#51A09B" className={styles.title}>
            Oscar
          </Typography> */}
        </Box>
        <Typography variant="h6" component="div">
          <IconButton onClick={handleOpenDialog}>
            {userDetails ? (
              <Avatar
                alt={userDetails.firstName}
                src={userDetails.profilePicUrl}
              />
            ) : (
              <Button className={styles.navButton}>Profile</Button>
            )}
          </IconButton>
        </Typography>
      </Toolbar>
      <ProfileDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};

export default Navbar;
