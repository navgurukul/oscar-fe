import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "150px",
      }}
    >
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
