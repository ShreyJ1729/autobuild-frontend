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
    useColorModeValue,
    Progress,
    HStack,
    Tag,
    TagLeftIcon,
    TagLabel,
    VStack
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Navbar from "./Navbar";
import KeyFeaturesQuestion from "./FeaturesQuestion";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { DESCRIPTION_EXAMPLES } from "./constants";
import { NAV_ITEMS } from "./constants";
import { DescriptionQuestion } from "./DescriptionQuestion";

const Home = () => {
    const [stepNumber, setStepNumber] = useState<number>(1);

    const [description, setDescription] = useState<string>("");
    const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const KEY_FEATURE_GEN_URL = "https://shreyj1729--landingpage-autobuild-feature-gen.modal.run/";

    const scrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }, 50);
    }

    const handleDescriptionSubmit = () => {
        console.log("User submitted description:", description)

        // Send description to backend
        axios.get(KEY_FEATURE_GEN_URL, {
            params: {
                description: description
            },
            data: { description: description }
        })
            .then((res) => {
                console.log("Got response from key feature gen: ", res);
                const data = res.data.replace(/'/g, '"')
                console.log("Data: ", data)
                const features = JSON.parse(data)["features"];
                console.log("Features: ", features)
                setKeyFeatures(features);
                setStepNumber(2);
                scrollToBottom();
                setLoading(false);
            }).catch((err) => {
                console.log("Key feature gen error: ", err);
                setLoading(false);
            })

        setLoading(true);
    }

    const handleFeaturesSubmit = () => {
        console.log("User submitted features:", keyFeatures)
        setStepNumber(3);
        scrollToBottom();
    }

    // show next step (key features, product name, UI framework, color scheme) with pregenerated options
    // option to regenerate options or manually edit
    // option to go back to previous step
    // option to submit

    // show loading screen while waiting for response
    // move to preview screen where preview is shown and user can edit code on sidebar, live updates

    return (<>
        <Navbar navItems={NAV_ITEMS} stepNumber={stepNumber} />

        {/* Main Form */}
        <Box p={4} w="full">
            <Box mt="12%" p={2}>
                <DescriptionQuestion description={description} setDescription={setDescription} handleDescriptionSubmit={handleDescriptionSubmit} loading={loading} />

                <Box my={20}></Box>

                {(stepNumber > 1) && <KeyFeaturesQuestion keyFeatures={keyFeatures} setKeyFeatures={setKeyFeatures} handleDescriptionSubmit={handleDescriptionSubmit} setStepNumber={setStepNumber} handleFeaturesSubmit={handleFeaturesSubmit} />}

                <Box my={20}></Box>

            </Box>
        </Box>
    </>
    );
}

export default Home;