// src/pages/EventPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import Container from "../components/Container";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { users, categories } = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!event) return <Text>No event found.</Text>;

  const user = users.find((user) => user.id === event.createdBy);
  const eventCategories = event.categoryIds
    .map((id) => categories.find((cat) => cat.id === id)?.name)
    .join(", ");

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");

      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <Container>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        my={4}
        p={4}
        textAlign="center"
      >
        <Image src={event.image} alt={event.title} />
        <Heading>{event.title}</Heading>
        <Text>{event.description}</Text>
        <Text>Location: {event.location}</Text>
        <Text>
          {new Date(event.startTime).toLocaleString()} -{" "}
          {new Date(event.endTime).toLocaleString()}
        </Text>
        <Text>Categories: {eventCategories}</Text>
        {user && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <Avatar src={user.image} alt={user.name} size="xl" mr={2} />
            <Text ml={4}>Created by: {user.name}</Text>
          </Box>
        )}
        <HStack justifyContent="center" mt={4} spacing={4}>
          <Button as={Link} to={`/edit-event/${event.id}`} colorScheme="teal">
            Edit
          </Button>
          <Button colorScheme="red" onClick={() => handleDelete(event.id)}>
            Delete
          </Button>
        </HStack>
        <Button colorScheme="blue" mt={4}>
          <Link to="/">Back to Events</Link>
        </Button>
      </Box>
    </Container>
  );
};
