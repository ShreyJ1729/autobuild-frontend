import { FaTwitter } from "react-icons/fa";
import {
    Box,
    chakra,
    Container,
    Flex,
    Heading,
    Link,
    LinkBox,
    LinkOverlay,
    Spacer,
    Stack,
} from "@chakra-ui/react";

const navLinks = [
    { name: "", link: "/" },
    // { name: "Home", link: "/" },
    // { name: "Waitlist", link: "#waitlist" },
];

const DesktopSidebarContents = ({ name }: any) => {
    return (
        <Container maxW='container.lg' p={1}>
            <Stack
                justify="space-between"
                p={[0, 4]}
                w="full"
                direction={["column", "row"]}
            >
                <Box display={{ base: "none", md: "flex" }}>
                    <Heading fontSize="xl">{name}</Heading>
                </Box>
                <Spacer />
                <Stack
                    align="flex-start"
                    spacing={[4, 10]}
                    direction={["column", "row"]}
                >
                    {navLinks.map((navLink: any, i: number) => {
                        return (
                            <Link
                                href={navLink.link}
                                key={`navlink_${i}`}
                                fontWeight={500}
                                variant="ghost"
                            >
                                {navLink.name}
                            </Link>
                        );
                    })}
                </Stack>
                <Spacer />
                <LinkBox>
                    <LinkOverlay href={`https://twitter.com/`} isExternal>
                        <FaTwitter />
                    </LinkOverlay>
                </LinkBox>
            </Stack>
        </Container>
    );
};

// No navbar on mobile for now
const MobileSidebar = ({ name }: any) => {
    // const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex w="full" align="center">
                <Heading fontSize="xl">{name}</Heading>
                <Spacer />
                <LinkBox>
                    <LinkOverlay href={`https://twitter.com/`} isExternal>
                        <FaTwitter />
                    </LinkOverlay>
                </LinkBox>
            </Flex>
        </>
    );
};

interface SidebarProps {
    name: string;
}

const Sidebar = ({ name }: SidebarProps) => {
    return (
        <chakra.header id="header">
            <Box display={{ base: "flex", md: "none" }} p={4}>
                <MobileSidebar name={name} />
            </Box>

            <Box display={{ base: "none", md: "flex" }} bg="black">
                <DesktopSidebarContents name={name} />
            </Box>
        </chakra.header>
    );
};

interface HeaderProps {
    name: string;
}

export const Header = ({ name }: HeaderProps) => {
    return (
        <Box w="full" textColor="white">
            <Sidebar name={name} />
        </Box>
    );
};