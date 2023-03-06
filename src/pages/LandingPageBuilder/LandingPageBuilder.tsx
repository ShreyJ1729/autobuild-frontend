import React, { useState } from "react";
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
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Home = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [description, setDescription] = useState<string>("");


    const handleDescriptionSubmit = () => {
        console.log("User submitted description:", description)
        // Send description to backend

        // show next step (key features, product name, UI framework, color scheme) with pregenerated options
        // option to regenerate options or manually edit
        // option to go back to previous step
        // option to submit

        // show loading screen while waiting for response
        // move to preview screen where preview is shown and user can edit code on sidebar, live updates
    }

    return (<>
        <Box p={4} >
            <Flex alignItems="center" justifyContent="space-between">
                <Heading size="md" >AutoBuild</Heading>
                <Stack direction="row" alignItems="center" spacing={4}>
                    <IconButton
                        aria-label="Toggle dark mode"
                        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                        onClick={toggleColorMode}
                    />
                    <Button colorScheme="blue">Sign in</Button>
                </Stack>
            </Flex>
        </Box>
        <Box p={4}>
            <Box mt={8}>
                <FormLabel>Build me a landing page for...</FormLabel>
                <Input size="lg"
                    fontWeight="semibold"
                    placeholder="your idea goes here"
                    _placeholder={{ color: colorMode === "light" ? "blackAlpha.700" : "whiteAlpha.700" }}
                    value={description}
                    onChange={(e) => { setDescription(e.currentTarget.value) }}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleDescriptionSubmit();
                        }
                    }}
                />

                <Button colorScheme="blue" mt={4} type="submit" onClick={handleDescriptionSubmit}>Go!</Button>
            </Box>
        </Box>
    </>
    );
}

export default Home;