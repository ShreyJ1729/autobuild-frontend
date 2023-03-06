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

const Home = () => {
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
                <Input size="lg" color="#ADD8E6" placeholder="Build me a landing page for..." borderColor={'gray.500'} _placeholder={{ color: 'gray.500' }} />
            </Box>
        </Box>
    );
}

export default Home;