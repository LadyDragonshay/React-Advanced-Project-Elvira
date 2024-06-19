// src/pages/ContactPage.jsx
import React from "react";
import { Box, Heading, Image, Text, SimpleGrid, Link } from "@chakra-ui/react";

const users = [
  {
    id: "1",
    name: "Ignacio Doe",
    image:
      "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg",
    introduction: "Meet Ignacio, a seasoned software engineer with over a decade of experience in the tech industry. Ignacio specializes in backend development and has a profound knowledge of various programming languages, including Java, Python, and C++. His passion for coding and problem-solving has led him to work on numerous high-profile projects, significantly enhancing system efficiencies and user experiences. When he's not coding, Ignacio enjoys mentoring young developers and contributing to open-source projects.",
    email: "Ignacio@fakemail.com"
  },
  {
    id: "2",
    name: "Jane Bennett",
    image:
      "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb401d7131c760ca1c63_Elieska%20Lensink.jpg",
    introduction: "Say hello to Jane, a highly skilled data scientist and software developer with a strong background in machine learning and artificial intelligence. Jane's expertise in Python, R, and SQL has empowered her to tackle complex data challenges and derive meaningful insights that drive business decisions. Her innovative approach to data analysis and model development has earned her recognition in the field. Jane is passionate about using technology to solve real-world problems and enjoys sharing her knowledge through speaking engagements and published articles.",
    email: "Jane@fakemail.com"
  },
  {
    id: "3",
    name: "Elvira Mersie Cid",
    image: "https://cdn.pixabay.com/photo/2020/02/22/09/09/cat-4869935_640.jpg",
    introduction: "Introducing Elvira, a dynamic and innovative front-end developer with a keen eye for design and a deep understanding of web technologies. Elvira excels in creating intuitive, user-friendly interfaces using HTML, CSS, and JavaScript, and is well-versed in modern frameworks like React. Her dedication to continuous learning and improvement has enabled her to stay ahead of industry trends and deliver cutting-edge solutions. Outside of work, Elvira is an advocate for women in tech and actively participates in community events and workshops.",
    email: "Elvira@fakemail.com"
  },
];

const ContactPage = () => {
  return (
    <Box maxW="800px" mx="auto" mt="5rem" p="2rem">
      <Heading as="h2" mb="2rem">
        Meet the Creators
      </Heading>
      <SimpleGrid columns={[1, 1, 3]} spacing="2rem">
        {users.map((user) => (
          <Box key={user.id} textAlign="center">
            <Image
              src={user.image}
              alt={user.name}
              borderRadius="full"
              boxSize="150px"
              mx="auto"
              mb="1rem"
            />
            <Text fontSize="xl" fontWeight="bold">
              {user.name}
            </Text>
            <Text mt="1rem">{user.introduction}</Text>
            <Text mt="1rem">
              <Link href={`mailto:${user.email}`} color="teal.500">
                {user.email}
              </Link>
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ContactPage;
