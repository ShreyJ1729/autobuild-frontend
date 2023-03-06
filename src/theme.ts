import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: "gray.900",
      },
    },
  },
});

export default theme;
