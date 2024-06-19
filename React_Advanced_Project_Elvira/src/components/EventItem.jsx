// src/components/EventItem.jsx
import React, { useContext } from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppContext } from "../context";
import Container from "./Container";
import { categoryColors } from "../colors"; // Import category colors

const EventItem = ({ event }) => {
  const { users, categories } = useContext(AppContext);
  const backgroundColor =
    event.categoryIds.length > 0
      ? categoryColors[event.categoryIds[0]] // Use the first category color
      : "#ffffff"; // Default color if no category

  const creator = users.find((user) => user.id == event.createdBy);
  const eventCategories = event.categoryIds
    .map((id) => categories.find((cat) => cat.id == id)?.name)
    .join(", ");

  return (
    <Container bg={backgroundColor}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" my={4} p={4}>
        <Link to={`/event/${event.id}`}>
          <Box height="300px" overflow="hidden" mb={4}>
            <Image
              src={event.image}
              alt={event.title}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
          <Heading size="md">{event.title}</Heading>
          <Text>{event.description}</Text>
          <Text>
            {new Date(event.startTime).toLocaleString()} -{" "}
            {new Date(event.endTime).toLocaleString()}
          </Text>
          <Text>Categories: {eventCategories}</Text>
          {creator && (
            <Box display="flex" alignItems="center" mt={2}>
              <Image
                src={creator.image}
                alt={creator.name}
                boxSize="40px"
                borderRadius="full"
                mr={2}
              />
              <Text>{creator.name}</Text>
            </Box>
          )}
        </Link>
      </Box>
    </Container>
  );
};

export default EventItem;
