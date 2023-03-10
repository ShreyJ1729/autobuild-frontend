import {
    Box,
    Button,
    ButtonGroup,
    Code,
    Divider,
    Editable,
    EditableInput,
    EditablePreview,
    EditableTextarea,
    Flex,
    FormLabel,
    HStack,
    IconButton,
    Input,
    List,
    ListItem,
    Text,
    Textarea,
    useEditableControls,
} from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor"

interface CodeOutputProps {
    code: { filename: string, code: string }[];
    setCode: (newCode: { filename: string, code: string }[]) => void;
}

const CodeOutput = ({ code, setCode }: CodeOutputProps) => {
    return (
        <Box>
            <FormLabel fontSize="lg" fontWeight="semi-bold">
                Typescript Code:

                <Text fontSize="sm" fontWeight="normal">
                    Copy and paste this code into your project.
                </Text>

                <Text fontSize="sm" fontWeight="normal">
                    Navbar.tsx
                </Text>
                <Code
                    colorScheme="green" fontSize="sm" p={2} m={2}>
                    {code.find((item) => item.filename === "Navbar.tsx")?.code}
                </Code>

                <Text fontSize="sm" fontWeight="normal">
                    Hero.tsx
                </Text>
                <Code
                    colorScheme="green" fontSize="sm" p={2} m={2}>
                    {code.find((item) => item.filename === "Hero.tsx")?.code}
                </Code>

                <Text fontSize="sm" fontWeight="normal">
                    Footer.tsx
                </Text>
                <Code
                    colorScheme="green" fontSize="sm" p={2} m={2}>
                    {code.find((item) => item.filename === "Footer.tsx")?.code}
                </Code>





            </FormLabel>
        </Box >
    );
}

export default CodeOutput;