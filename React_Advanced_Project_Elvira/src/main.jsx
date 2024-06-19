// src/main.jsx
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { AddEventPage } from "./pages/AddEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import { AppProvider } from "./context";
import theme from "./theme";
import ErrorBoundary from "./ErrorBoundary"; // Import ErrorBoundary component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/add-event",
        element: <AddEventPage />,
      },
      {
        path: "/edit-event/:eventId",
        element: <EditEventPage />,
      },
      {
        path: "/feedback",
        element: <FeedbackPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <ErrorBoundary>
          <RouterProvider router={router}>
            <Root />
          </RouterProvider>
        </ErrorBoundary>
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
