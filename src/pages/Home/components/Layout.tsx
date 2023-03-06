import { Box, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Header } from "./Header";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
    children,
}: LayoutProps) => {
    return (
        <Box bg="black" width="100vw" height="100vh">
            <VStack spacing={"8%"} w="full" align="center">
                <Header name="AutoBuild" />
                {children}
            </VStack>
        </Box>
    );
};