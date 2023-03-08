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
    VStack,
    Textarea,
    Spinner
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DESCRIPTION_EXAMPLES } from "./constants";

interface DescriptionQuestionProps {
    description: string;
    setDescription: (newDescription: string) => void;
    handleDescriptionSubmit: () => void;
    loading: boolean;
}

export const DescriptionQuestion = ({ description, setDescription, handleDescriptionSubmit, loading }: DescriptionQuestionProps) => {

    const { colorMode } = useColorMode();

    const handleTagClick = (index: number) => {
        setDescription(DESCRIPTION_EXAMPLES[index].description);
    }

    return (<>
        <VStack py={5} px={20}>
            <FormLabel fontSize={"4xl"} mb="20px" >Build me a landing page for...</FormLabel>
            <FormLabel fontSize={"lg"} >Describe your product or company in 1-2 sentences below. Or you can select one of the examples below.</FormLabel>

            <Box pt={10}>
                <Stack direction={['column', 'row']} spacing={4} >
                    {DESCRIPTION_EXAMPLES.map((example, index) => (
                        <Tag size="md" key={index} variant='subtle' colorScheme={example.color} _hover={{ cursor: "pointer", opacity: 0.8 }} onClick={() => { handleTagClick(index) }}>
                            <TagLeftIcon boxSize='12px' as={AddIcon} />
                            <TagLabel>{example.title}</TagLabel>
                        </Tag>
                    ))}
                </Stack>
            </Box>

            <Flex w="100%" mx={2} my={5}>
                <Input
                    size="lg"
                    m={2}
                    p={2}
                    fontWeight="light"
                    placeholder="A digital marketing agency"
                    _placeholder={{ color: colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.600" }}
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            handleDescriptionSubmit();
                        }
                    }}
                />
                <Button isDisabled={loading} colorScheme="green" m={3} type="submit" onClick={handleDescriptionSubmit}>{loading ? <Spinner /> : <>Go!</>}</Button>
            </Flex>
        </VStack>
    </>)
}