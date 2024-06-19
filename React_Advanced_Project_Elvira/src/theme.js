// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.900")(props), // Change this to the background color you want
    },
  }),
};

const theme = extendTheme({ styles });

export default theme;

// src/theme.js
//import { extendTheme } from "@chakra-ui/react";
//import { mode } from "@chakra-ui/theme-tools";
// 
//const styles = {
//  global: (props) => ({
//    body: {
//      bgImage: "url('url('src/backend_data/BG_achtergrond.jpg')", // Set your image path here
//      bgRepeat: "no-repeat",
//      bgSize: "cover",
//      bgPosition: "center center",
//    },
//  }),
//};
//
//const theme = extendTheme({ styles });
//
//export default theme;
