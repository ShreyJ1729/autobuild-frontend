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
    Spinner,
    Link,
    Text
} from "@chakra-ui/react";
import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { DESCRIPTION_EXAMPLES } from "./constants";

interface DescriptionQuestionProps {
    description: string;
    setDescription: (newDescription: string) => void;
    handleDescriptionSubmit: () => void;
    loading: boolean;
}

const DescriptionQuestion = ({ description, setDescription, handleDescriptionSubmit, loading }: DescriptionQuestionProps) => {

    const { colorMode } = useColorMode();

    const handleTagClick = (index: number) => {
        setDescription(DESCRIPTION_EXAMPLES[index].description);
    }

    return (<>
        <VStack py={5} px={20}>
            <FormLabel fontSize={"4xl"} mb="20px" >Build a landing page with zero effort</FormLabel>
            <FormLabel fontSize={"lg"} >Describe your product or company in 1-2 sentences below. Or you can select one of the templates below.</FormLabel>

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
            <Text>
                See some examples of landing pages built with this tool: <Box>

                    <Flex direction={['column', 'row']}>
                        <Spacer />
                        <Link href='/examples/clickfuel' isExternal mx="auto" my="2" color="cyan">ClickFuel <ExternalLinkIcon mx='2px' /></Link>
                        <Spacer />
                        <Link href='/examples/surfaclub' isExternal mx="auto" my="2" color="orange.400">SurfaClub <ExternalLinkIcon mx='2px' /></Link>
                        <Spacer />
                    </Flex>
                </Box>
            </Text>
        </VStack>
    </>)
}

export default DescriptionQuestion;