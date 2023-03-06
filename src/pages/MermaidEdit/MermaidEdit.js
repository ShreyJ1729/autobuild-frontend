import { IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mermaidData, fileData, idea } from "recoil/atoms";
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

import CodeEditor from "@uiw/react-textarea-code-editor";
import Chatbot from "./components/Chatbot";
import Preview from "./components/MermaidPreview";
import defaultMermaid from "./components/defaultMermaid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MermaidEdit = () => {
  const [data, setData] = useRecoilState(mermaidData);
  const [content, setContent] = useState([]);
  const [code, setCode] = useState(defaultMermaid);
  const [fileData2, setFileData] = useRecoilState(fileData);
  const navigate = useNavigate(); // routing
  const [userIdea, setIdea] = useRecoilState(idea);

  const sendMermaidForCodeGen = () => {
    console.log("sending code req");
    const obj = {
      mermaid: data,
      description: userIdea,
    };
    axios
      .post(
        "https://shreyj1729--autobuild-fastapi-app.modal.run/mermaid-to-code",
        obj
      )
      .then((res) => {
        const files = res.data["files"];
        console.log("got response from file build");
        console.log(files);
        setData(files);
      })
      .then(() => {
        navigate(`/codegen`);
      });
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

export default MermaidEdit;
