import { IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mermaidData, fileData } from "../recoil/atoms.js";
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
import { useNavigate } from "react-router-dom";

const App = () => {
  const [fileData, setFileData] = useRecoilState();

  const sendFilesForDownload = () => {

    const obj = {
      dump: fileData,
    };
    axios.post(
      "https://127.0.0.1:5000/api/setpages",
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
      </Flex>

      <IconButton
          icon={<ArrowForwardIcon />}
          aria-label="Right arrow"
          size="md"
          colorScheme="blue"
          onClick={() => {
            sendFilesForDownload();
          }}
        />

      <p>DONE</p>

    </>
  );
};

export default App;
