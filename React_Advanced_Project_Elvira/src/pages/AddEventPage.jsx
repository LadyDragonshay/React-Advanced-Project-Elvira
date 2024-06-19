// src/pages/AddEventPage.jsx

import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Input,
  Textarea,
  Button,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Image as ChakraImage,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import Container from "../components/Container";

export const AddEventPage = () => {
  const { categories, users } = useContext(AppContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState(""); // State for error message

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async () => {
    // Validate inputs
    if (
      !title ||
      !description ||
      !image ||
      !location ||
      !startTime ||
      !endTime ||
      !createdBy ||
      categoryIds.length === 0
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const events = await response.json();
      const highestId = events.reduce(
        (max, event) => Math.max(max, parseInt(event.id)),
        0
      );
      const nextId = highestId + 1;

      const newEvent = {
        id: nextId.toString(),
        title,
        description,
        image,
        categoryIds: categoryIds.map((id) => parseInt(id)),
        location,
        startTime,
        endTime,
        createdBy: parseInt(createdBy),
      };

      const addResponse = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!addResponse.ok) throw new Error("Failed to add event");

      alert("Event successfully added!");
      navigate("/");
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Failed to add event. Please try again later."); // Specific error message
    }
  };

  const handleCategoryChange = (newCategoryIds) => {
    setCategoryIds(newCategoryIds);
  };

  return (
    <Container>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Image URL"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <ChakraImage src={image} alt="Event" />}
      <Stack spacing={2}>
        <CheckboxGroup value={categoryIds} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Checkbox key={category.id} value={category.id}>
              {category.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>
      <Input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Select
        placeholder="Select Creator"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
      <Button colorScheme="teal" onClick={handleAddEvent}>
        Add Event
      </Button>
      <Box mt={4}>
        <Button as={RouterLink} to="/" colorScheme="blue">
          Back to Events
        </Button>
      </Box>
    </Container>
  );
};
