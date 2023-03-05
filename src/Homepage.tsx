import React from "react";
import {
    Box,
    Input,
    Stack,
    Heading,
    Flex,
    Spacer,
    Button,
    IconButton,
    useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Homepage = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box p={4}>
            <Flex alignItems="center" justifyContent="space-between">
                <Heading size="md">AutoBuild</Heading>
                <Stack direction="row" alignItems="center" spacing={4}>
                    <IconButton
                        aria-label="Toggle dark mode"
                        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                        onClick={toggleColorMode}
                    />
                    <Button colorScheme="blue">Sign in</Button>
                </Stack>
            </Flex>
            <Box mt={8}>
                <Input size="lg" placeholder="What do you want to build?" />
            </Box>
        </Box>
    );
}

export default Homepage;