import { IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mermaidData } from "../recoil/atoms.js";
import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  Link,
  Popover,
  PopoverTrigger,
  useBreakpointValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import example from "./defaultMermaid";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Chatbot from "./Chatbot.js";
import Preview from "./MermaidPreview.js";
import defaultMermaid from "./defaultMermaid";
import axios from "axios";

const App = () => {
  const [data, setData] = useRecoilState(mermaidData);
  const [content, setContent] = useState([]);
  const [code, setCode] = useState(defaultMermaid);

  const sendMermaidForCodeGen = () => {
    const obj = {
      mermaid: data,
    };
    axios.post(
      "https://shreyj1729--autobuild-fastapi-app.modal.run/mermaid-to-code",
      obj
    );
  };

  return (
    <>
      {/* Header */}
      <Flex
        bg={useColorModeValue("black", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("white", "white")}
          >
            <b>AutoBuild</b>
          </Text>
        </Flex>
        <IconButton
          icon={<ArrowForwardIcon />}
          aria-label="Right arrow"
          size="md"
          colorScheme="blue"
          onClick={() => {
            sendMermaidForCodeGen();
          }}
        />
      </Flex>
      {/* Diagram */}
      <Preview code={data} />
      <br />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%" h="10" bg="black">
          <CodeEditor
            value={data}
            language="js"
            placeholder=""
            onChange={(evn) => setData(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#000000",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </GridItem>
        <GridItem w="100%" h="10" bg="black">
          <Chatbot />
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
