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
    Textarea
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DESCRIPTION_EXAMPLES } from "./constants";

interface DescriptionQuestionProps {
    description: string;
    setDescription: (newDescription: string) => void;
    handleDescriptionSubmit: () => void;
}

export const DescriptionQuestion = ({ description, setDescription, handleDescriptionSubmit }: DescriptionQuestionProps) => {

    const { colorMode } = useColorMode();

    const handleTagClick = (index: number) => {
        setDescription(DESCRIPTION_EXAMPLES[index].description);
    }

    return (<>
        <VStack py={5} px={10}>
            <FormLabel fontSize={"3xl"} >Build me a landing page for...</FormLabel>
            <FormLabel fontSize={"sm"} >Describe your product or company in 1-2 sentences below. Or you can click one of the examples below. You can always change this later.</FormLabel>
            <Stack direction={['column', 'row']} spacing={4}>
                {DESCRIPTION_EXAMPLES.map((example, index) => (
                    <Tag size="md" key={index} variant='subtle' colorScheme={example.color} _hover={{ cursor: "pointer", opacity: 0.8 }} onClick={() => { handleTagClick(index) }}>
                        <TagLeftIcon boxSize='12px' as={AddIcon} />
                        <TagLabel>{example.title}</TagLabel>
                    </Tag>
                ))}
            </Stack>
            <Flex w="100%" m={2}>
                <Input
                    size="lg"
                    m={2}
                    p={2}
                    fontWeight="semibold"
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
                <Button colorScheme="green" m={3} type="submit" onClick={handleDescriptionSubmit}>Go!</Button>
            </Flex>
        </VStack>
    </>)
}