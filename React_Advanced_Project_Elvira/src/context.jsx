import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:3000/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventsResponse = await fetch("http://localhost:3000/events");
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const addEvent = (newEvent) => {
    // Simulate adding event and updating state, assuming no API error here
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    // Simulate updating event and updating state, assuming no API error here
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    // Simulate deleting event and updating state, assuming no API error here
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        categories,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
