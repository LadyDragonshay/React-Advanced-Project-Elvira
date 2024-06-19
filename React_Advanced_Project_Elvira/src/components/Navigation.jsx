// src/components/Navigation.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav" bg="teal.500" p={4} color="white">
      <Flex justify="space-between" wrap="wrap">
        <Box>
          <Link to="/">Home</Link>
        </Box>
        <Box>
          <Link to="/event/1">Event</Link>
        </Box>
      </Flex>
    </Box>
  );
};
