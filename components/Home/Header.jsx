import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    // <Typography variant="h2" fontSize={80} align="center" color="#51A09B" fontWeight={700} paddingTop={4}>
    //   Oscar
    // </Typography>
    <Box             sx={{
      display: "flex",
      // alignItems: "center",
      justifyContent: "center",
      paddingTop:"20px"

    }}>
    <Image
    src="/images/Oscar Logo png-1.png"
    alt="Oscar Logo"
    width={100} 
    height={100} 
  />
  </Box>
  );
};

export default Header;
