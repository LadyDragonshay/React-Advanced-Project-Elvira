// src/pages/FeedbackPage.jsx
import React, { useState, useEffect } from "react";
import {
  Heading,
  Textarea,
  Button,
  Box,
  Text,
  Stack,
  Flex,
  Input,
} from "@chakra-ui/react";
import { handlePointerEvent } from "../utils";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [existingFeedback, setExistingFeedback] = useState([]);

  useEffect(() => {
    // Fetch existing feedback
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback.");
        }
        const data = await response.json();
        setExistingFeedback(
          data.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleRatingClick = (selectedRating) => {
    if (!submitted) {
      setRating(selectedRating);
    }
  };
  const handleDateChange = (e) => setDate(e.target.value);

  const handleSubmit = async () => {
    const eventId = 1; // Replace with the actual event ID

    if (!feedback.trim() || rating < 1 || rating > 5 || !date) {
      setError(
        "Please provide valid feedback, a rating between 1 and 5 stars, and a date."
      );
      return;
    }

    const feedbackData = {
      feedback,
      rating,
      eventId,
      date,
    };

    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      const result = await response.json();
      console.log("Submission successful:", result);

      setSubmitted(true);
      setError("");
      setExistingFeedback([result, ...existingFeedback]);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(
        "There was an error submitting your feedback. Please try again later."
      );
    }
  };

  useEffect(() => {
    const handleEvent = (e) => {
      handlePointerEvent(e, (pointerType) => {
        if (pointerType === "virtual") {
          // Do something with virtual clicks if needed
        }
      });
    };

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          fontSize="2xl"
          color={i <= rating ? "teal.500" : "gray.300"}
        >
          {i <= rating ? "★" : "☆"}
        </Text>
      );
    }
    return stars;
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      maxW="1200px"
      mx="auto"
      mt="5rem"
      p="2rem"
      border="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Box flex="1" mr={{ md: "2rem" }} mb={{ base: "2rem", md: "0" }}>
        <Heading as="h3" mb="1rem" size="md">
          Existing Feedback
        </Heading>
        {existingFeedback.map((item) => (
          <Box key={item.id} mb="1rem">
            <Text>
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Feedback:</strong> {item.feedback}
            </Text>
            <Stack direction="row">{renderStars(item.rating)}</Stack>
          </Box>
        ))}
      </Box>
      <Box flex="1">
        <Heading as="h2" mb="1rem">
          Give Your Feedback
        </Heading>
        {submitted ? (
          <Text mb="1rem">Thank you for your feedback!</Text>
        ) : (
          <>
            {error && (
              <Text color="red.500" mb="1rem">
                {error}
              </Text>
            )}
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={handleFeedbackChange}
              mb="1rem"
              p="0.5rem"
              width="100%"
              isRequired
            />
            <Stack direction="row" spacing={2} mb="1rem">
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  fontSize="2xl"
                  cursor="pointer"
                  onClick={() => handleRatingClick(star)}
                  color={star <= rating ? "teal.500" : "gray.300"}
                >
                  {star <= rating ? "★" : "☆"}
                </Text>
              ))}
            </Stack>
            <Input
              type="date"
              value={date}
              onChange={handleDateChange}
              mb="1rem"
              isRequired
            />
            <Button onClick={handleSubmit} colorScheme="teal" width="100%">
              Submit Feedback
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default FeedbackPage;
