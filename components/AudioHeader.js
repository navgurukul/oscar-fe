import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user) {
      setUserDetails(user.user);
    }
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleToken");
    window.location.href = "/";
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
        </Box>
        <Typography variant="h6" component="div">
          <IconButton onClick={handleOpenMenu}>
            {userDetails ? (
              <Avatar
                alt={userDetails.firstName}
                src={userDetails.profilePicUrl}
              />
            ) : (
              <Button className={styles.navButton}>Profile</Button>
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            sx={{
              // mt: 1,
              "& .MuiPaper-root": {
                width: 200,
                // padding: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem
              onClick={handleLogout}
              // sx={{
              //   "&:hover": {
              //     backgroundColor: "#51A09B",
              //     color: "#fff",
              //   },
              // }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Typography>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
