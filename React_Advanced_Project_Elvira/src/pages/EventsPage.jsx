// src/pages/EventsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Heading,
  Input,
  Select,
  Button,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import EventItem from "../components/EventItem";
import Container from "../components/Container";

export const EventsPage = () => {
  const { categories } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryIds.includes(parseInt(selectedCategory))
      : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Container>
      <Heading>List of events</Heading>
      <Input
        placeholder="Search events"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="1rem"
        p="0.5rem"
        width="100%"
      />
      <Select
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        mb="1rem"
        p="0.5rem"
        width="100%"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <HStack justifyContent="center" mt={4} spacing={4}>
        <Button as={Link} to="/add-event" colorScheme="teal">
          Add Event
        </Button>
        <Button onClick={() => navigate("/feedback")} colorScheme="blue">
          Give Feedback
        </Button>
        <Button onClick={() => navigate("/contact")} colorScheme="teal">
          Contact Creators
        </Button>
      </HStack>
      <Box>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventItem key={event.id} event={event} categories={categories} />
          ))
        ) : (
          <Text>No events found matching your search criteria.</Text>
        )}
      </Box>
    </Container>
  );
};
