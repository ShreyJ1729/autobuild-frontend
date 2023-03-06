import { mode } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {},
  },
  config: {
    disableTransitionOnChange: false,
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});

export default theme;
