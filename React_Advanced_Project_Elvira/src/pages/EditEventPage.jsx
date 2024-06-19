// src/pages/EditEventPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Input,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Image,
  Text,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import Container from "../components/Container";
import Select from "react-select";

export const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { categories, events, updateEvent } = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [creator, setCreator] = useState("");

  useEffect(() => {
    const eventToEdit = events.find((e) => e.id === eventId);
    if (eventToEdit) {
      setEvent(eventToEdit);
      setTitle(eventToEdit.title || "");
      setDescription(eventToEdit.description || "");
      setImage(eventToEdit.image || "");
      setLocation(eventToEdit.location || "");
      setStartTime(eventToEdit.startTime || "");
      setEndTime(eventToEdit.endTime || "");
      setSelectedCategories(
        eventToEdit.categoryIds.map((id) => ({
          value: id,
          label: categories.find((cat) => cat.id === id)?.name || "Unknown",
        })) || []
      );
      setCreator(eventToEdit.creator || "");
    }
  }, [eventId, events, categories]);

  const handleUpdateEvent = async () => {
    const updatedEvent = {
      ...event,
      title,
      description,
      image,
      location,
      startTime,
      endTime,
      categoryIds: selectedCategories.map((category) => category.value),
    };

    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        updateEvent(updatedEvent); // Update context
        toast({
          title: "Event updated.",
          description: "The event was successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(`/event/${eventId}`);
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!event) return <div>Loading...</div>;

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Container>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="image" isRequired mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>
      <FormControl id="location" isRequired mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>
      <FormControl id="startTime" isRequired mt={4}>
        <FormLabel>Start Time</FormLabel>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>
      <FormControl id="endTime" isRequired mt={4}>
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormControl>
      <FormControl id="categories" isRequired mt={4}>
        <FormLabel>Categories</FormLabel>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
      </FormControl>
      <Button colorScheme="teal" mt={4} onClick={handleUpdateEvent}>
        Update Event
      </Button>

      {creator && (
        <Box
          mt={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Text fontSize="lg" fontWeight="bold">
            Created by:
          </Text>
          <Box display="flex" alignItems="center" mt={2}>
            <Image
              src={creator.image}
              alt={creator.name}
              boxSize="50px"
              borderRadius="full"
              mr={2}
            />
            <Text>{creator.name}</Text>
          </Box>
        </Box>
      )}
    </Container>
  );
};
