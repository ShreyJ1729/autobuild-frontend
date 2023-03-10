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
import Navbar from "./Navbar";
import axios from "axios";
import DescriptionQuestion from "./DescriptionQuestion";
import KeyFeaturesQuestion from "./FeaturesQuestion";
import CodeOutput from "./CodeOutput";
import { NAV_ITEMS } from "./constants";

const Home = () => {
    const [stepNumber, setStepNumber] = useState<number>(0);

    const [productDescription, setProductDescription] = useState<string>("");
    const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);

    // code is an array of objects, each has the filename and the code
    const [code, setCode] = useState<{ filename: string, code: string }[]>([]);

    const KEY_FEATURE_GEN_URL = "https://shreyj1729--landingpage-autobuild-feature-gen.modal.run/";
    const CODE_GEN_URL = "https://shreyj1729--landingpage-autobuild-component-gen.modal.run/";

    const scrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }, 50);
    }

    const handleDescriptionSubmit = () => {
        console.log("User submitted productDescription:", productDescription)
        setStepNumber(1);

        // Send productDescription to backend
        axios.get(KEY_FEATURE_GEN_URL, {
            params: {
                description: productDescription
            },
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
        console.log("User submitted description and features for codegen:", keyFeatures)
        sendDataForCodeGen();
        setLoading2(true);
        setStepNumber(3);
        scrollToBottom();
    }

    const sendDataForCodeGen = () => {

        const components = [
            "Navbar",
            "Hero",
            "Footer",
        ]

        const componentDescriptions: { [key: string]: string } = {
            "Navbar": "Navbar component with a logo, dark mode toggle, a link to the product page, and a link to the pricing page",
            "Hero": "A full-page dramatic Hero section with a title and subtitle text",
            "Footer": "A Footer component with social links, a link to the privacy policy, and a link to the terms of service",
        }

        // for each component, send productDescription and key features to backend
        components.forEach((component) => {
            axios.get(CODE_GEN_URL, {
                params: {
                    component: component,
                    design: "modern and minimalistic, with a focus on typography and whitespace",
                    description: componentDescriptions[component] + " for the following product: " + productDescription,
                }
            })
                .then((res) => {
                    console.log("Got response from code gen: ", res);
                    const codeobj = {
                        filename: component + ".tsx",
                        code: res.data
                    }
                    setCode((prev) => [...prev, codeobj]);
                    setLoading2(false);
                    setStepNumber(4);
                }).catch((err) => {
                    console.error("Code gen error: ", err);
                    setLoading2(false);
                })
        })
    }

    // move to preview screen where preview is shown and user can edit code on sidebar, live updates

    return (<>
        <Navbar navItems={NAV_ITEMS} stepNumber={stepNumber} />

        {/* Main Form */}
        <Box p={4} w="full">
            <Box mt="12%" p={2}>
                <DescriptionQuestion description={productDescription} setDescription={setProductDescription} handleDescriptionSubmit={handleDescriptionSubmit} loading={loading} />

                <Box my={20}></Box>

                {(stepNumber > 1) && <KeyFeaturesQuestion keyFeatures={keyFeatures} setKeyFeatures={setKeyFeatures} handleDescriptionSubmit={handleDescriptionSubmit} setStepNumber={setStepNumber} handleFeaturesSubmit={handleFeaturesSubmit} loading2={loading2} />}

                <Box my={20}></Box>

                {(stepNumber > 2) && <CodeOutput code={code} setCode={setCode} />}

            </Box>
        </Box>
    </>
    );
}

export default Home;