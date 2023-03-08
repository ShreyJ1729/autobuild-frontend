import { Box, Button, Heading, Text } from "@chakra-ui/react";

const Hero = () => {
    return (
        <Box
            bgGradient="linear(to-r, teal.500,green.500)"
            w="full"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box maxW="lg" textAlign="center">
                <Heading as="h1" size="4xl" fontWeight="bold" color="white">
                    Welcome to Vercel
                </Heading>
                <Text fontSize="xl" mt={6} color="white">
                    The best platform to deploy your React applications with ease and speed.
                </Text>
                <Button
                    mt={12}
                    colorScheme="teal"
                    size="lg"
                    onClick={() => console.log("Clicked!")}
                >
                    Get started
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
