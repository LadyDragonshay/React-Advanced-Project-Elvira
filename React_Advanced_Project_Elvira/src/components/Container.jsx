// src/components/Container.jsx
import React from "react";
import { Box } from "@chakra-ui/react";

const Container = ({ children, bg, ...props }) => {
  return (
    <Box
      maxWidth={["100%", "100%", "600px"]} // full width on small screens, 600px on larger screens
      margin="1rem auto"
      padding="2rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      backgroundColor={bg}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
