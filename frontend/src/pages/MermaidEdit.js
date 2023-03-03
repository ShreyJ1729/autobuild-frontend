import React, { Component, Fragment, useEffect, useState, useRef } from "react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
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
    GridItem
  } from "@chakra-ui/react";

import Mermaid from "./Mermaid";
import example from "./defaultMermaid";
import CodeEditor from '@uiw/react-textarea-code-editor';
import Chatbot from "./Chatbot.js";

const App = () => {
  const [data, setData] = useRecoilState(mermaidData);
  const [mermaidState, setMermaidState] = useState(example);
  const [content, setContent] = useState([]);
  const [code, setCode] = useState(`  
    graph TD;
    App-->|renders|ChatWindow;
    ChatWindow-->|renders|ChatHeader;
    ChatWindow-->|renders|ChatBody;
    ChatWindow-->|renders|ChatInput;
    ChatBody-->|iterativelyrenders|ChatMessage;
    ChatHeaderProps["roomName:string"];
    ChatMessageProps["author:string,<br/>text:string,<br/>timestamp:string"];
    ChatInput-sendMessage["sendMessage"];
    ChatInput-->|calls|ChatInput-sendMessage;
    utils/socket.io[utils/socket.io.js];
    socket["socket.io-client"];
    utils/recoil[utils/recoil.js];
    messagesAtom["[{id:string<br/>author:string,<br/>text:string,<br/>timestamp:string},...]"];
    utils/recoil-.->|messagesAtom|messagesAtom;
    utils/socket.io-.->|socket|socket;
    utils/socket.io-->|updatesmessages|messagesAtom;
    ChatBody-->|reads|messagesAtom;
    ChatHeader-.->|props|ChatHeaderProps;
    ChatMessage-.->|props|ChatMessageProps;
  `);

  useEffect(() => {
    let out = `${data["mermaid"]}`;
    out = out.slice(0, out.length - 1);
    setMermaidState(out);
    console.log(out);
    content.push(<Mermaid key={content.length} chart={out} />);
  }, [data, content]);

  return <>
    
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

    {/* Diagram */}
    {content.length > 0 ? content[content.length - 1] : <></>}
  
    
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem w='100%' h='10' bg='black'>
            <CodeEditor
                value={code}
                language="js"
                placeholder=""
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    backgroundColor: "#000000",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
        </GridItem>
        <GridItem w='100%' h='10' bg='black'>
            <Chatbot/>
        </GridItem>
    </Grid>
  
  </>;
};

export default App;
