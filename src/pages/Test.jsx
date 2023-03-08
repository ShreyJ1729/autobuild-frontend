import Hero from "./Hero"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Test = () => {
    return (<>
        <Navbar />
        <Hero />
        <Footer />
    </>)
}

export default Test

// import { useState } from "react";
// import {
//     Box,
//     Flex,
//     Spacer,
//     Button,
//     useColorMode,
//     useColorModeValue,
//     IconButton,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     Link,
// } from "@chakra-ui/react";
// import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const { toggleColorMode } = useColorMode();
//     const colorModeText = useColorModeValue("dark", "light");

//     const handleToggle = () => setIsOpen(!isOpen);

//     return (
//         <Box bg={useColorModeValue("white", "gray.800")} px={4} py={3}>
//             <Flex alignItems="center">
//                 <Box>
//                     <Link href="/">
//                         <Box fontSize="2xl" fontWeight="bold">
//                             My Website
//                         </Box>
//                     </Link>
//                 </Box>

//                 <Spacer />

//                 <Box display={{ base: "none", md: "block" }}>
//                     <Link href="/about">
//                         <Button variant="ghost" mr={4}>
//                             About
//                         </Button>
//                     </Link>
//                     <Link href="/blog">
//                         <Button variant="ghost" mr={4}>
//                             Blog
//                         </Button>
//                     </Link>
//                     <Link href="/contact">
//                         <Button variant="ghost" mr={4}>
//                             Contact
//                         </Button>
//                     </Link>
//                 </Box>

//                 <Spacer />

//                 <Box display={{ base: "block", md: "none" }}>
//                     <IconButton
//                         variant="ghost"
//                         icon={<HamburgerIcon />}
//                         aria-label="Open menu"
//                         onClick={handleToggle}
//                     />
//                 </Box>

//                 <Box display={{ base: "none", md: "block" }}>
//                     <IconButton
//                         variant="ghost"
//                         icon={<MoonIcon />}
//                         aria-label={`Switch to ${colorModeText} mode`}
//                         onClick={toggleColorMode}
//                     />
//                 </Box>

//                 <Box display={{ base: "none", md: "block" }}>
//                     <Menu>
//                         <MenuButton
//                             as={Button}
//                             variant="ghost"
//                             aria-label="Open subnavigation menu"
//                             rightIcon={<i className="fas fa-chevron-down"></i>}
//                         >
//                             Subnavigation
//                         </MenuButton>
//                         <MenuList>
//                             <Link href="/sub1">
//                                 <MenuItem>Sublink 1</MenuItem>
//                             </Link>
//                             <Link href="/sub2">
//                                 <MenuItem>Sublink 2</MenuItem>
//                             </Link>
//                             <Link href="/sub3">
//                                 <MenuItem>Sublink 3</MenuItem>
//                             </Link>
//                         </MenuList>
//                     </Menu>
//                 </Box>
//             </Flex>

//             {isOpen && (
//                 <Box pt={4}>
//                     <Link href="/about">
//                         <Button
//                             variant="ghost"
//                             width="full"
//                             textAlign="left"
//                             mb={2}
//                             onClick={handleToggle}
//                         >
//                             About
//                         </Button>
//                     </Link>
//                     <Link href="/blog">
//                         <Button
//                             variant="ghost"
//                             width="full"
//                             textAlign="left"
//                             mb={2}
//                             onClick={handleToggle}
//                         >
//                             Blog
//                         </Button>
//                     </Link>
//                     <Link href="/contact">
//                         <Button
//                             variant="ghost"
//                             width="full"
//                             textAlign="left"
//                             mb={2}
//                             onClick={handleToggle}
//                         >
//                             Contact
//                         </Button>
//                     </Link>

//                     <Box mt={4} display={{ base: "none", md: "block" }}>
//                         <IconButton
//                             variant="ghost"
//                             icon={<SunIcon />}
//                             aria-label={`Switch to ${colorModeText === "dark" ? "light" : "dark"} mode`}
//                             onClick={toggleColorMode}
//                         />
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default Navbar;