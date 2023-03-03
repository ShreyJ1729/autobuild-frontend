import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

import { Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import {
  Flex,
  IconButton,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Logo from "../Logo.png";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { mermaidData } from "../recoil/atoms.js";
import bg from "../abstract.jpg";

const LandingPage2 = () => {

  const navigate = useNavigate(); // routing
  const { isOpen, onToggle } = useDisclosure(); // menu
  const [data, setData] = useRecoilState(mermaidData); // requested mermaid data
  const [input, setInput] = useState(""); // input box state

  // css vars
  const linkColor = useColorModeValue("white.900", "white.900");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  // send inp to backend
  function sendInput(e) {
    console.log('sending input');
    
    // format
    const obj = {
      description: input,
    };

    axios
      .post(
        "https://shreyj1729--autobuild-fastapi-app.modal.run/mermaid-gen",
        obj
      )
      .then((res) => {
        const mermaid_code = res.data;
        // update recoil state
        setData(mermaid_code);
      });

    // go to mermaid edit page
    navigate(`/app`);
  }

  return (
    <>
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

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction={"row"} spacing={4}>
                <Box key={'About'}>
                <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                    <Link
                        p={2}
                        href={'/about' ?? "#"}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"white.800"}
                        _hover={{
                        textDecoration: "none",
                        color: "white",
                        }}
                    >
                        About
                    </Link>
                    </PopoverTrigger>
                </Popover>
                </Box>
                <Box key={'Pricing'}>
                <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                    <Link
                        p={2}
                        href={'/pricing' ?? "#"}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"white.800"}
                        _hover={{
                        textDecoration: "none",
                        color: "white",
                        }}
                    >
                        Pricing
                    </Link>
                    </PopoverTrigger>
                </Popover>
                </Box>
            </Stack>
          </Flex>

        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/signin"}
            color={"white"}
          >
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#5A02E5"}
            href={"/signup"}
            _hover={{
              bg: "green.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>

      </Flex>


      <Container maxW={"3xl"}>


        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Fully autonomous
            <br />
            <Text as={"span"} color={"#5A02E5"}>
              codegen
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Get started by giving a description of your program in the box
            below...
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >

            <Textarea
              placeholder="2-3 sentences recommended"
              borderColor="green"
              h="100px"
              width="500px"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <Button
              colorScheme={"green"}
              bg={"#5A02E5"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "#5A02E5",
              }}
              onClick={sendInput}
            >
              Generate Program
            </Button>
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};


// export
export default LandingPage2;
