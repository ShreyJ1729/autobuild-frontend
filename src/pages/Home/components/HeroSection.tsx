import {
    Button,
    Center,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Input,
    Spinner
} from "@chakra-ui/react";
import { useState, useRef, useEffect, FunctionComponent } from "react";

import { db, ref, set, analytics } from "utils/firebase"

interface HeroSectionProps { }

export const HeroSection: FunctionComponent<HeroSectionProps> = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    return (
        <Container maxW="container.lg">
            <Center p={4}>
                <div className="hero-container">
                    <VStack>
                        <Container maxW="container.md" textAlign="center">
                            <Heading size="2xl" mb={4} color="gray.200">
                                The future of software development
                            </Heading>

                            <Text fontSize="xl" color="gray.400">
                                Fully Autonomous Code Generation
                            </Text>

                            <VStack align="center" mt={20}>
                                <Text mt={2} fontSize="md" color="white" fontWeight="bold">
                                    Sign up for our waitlist
                                </Text>

                                <HStack maxW="md" mx="auto" align="center">
                                    <AnimatedInput
                                        placeholder="<someone@email.com>"
                                        emailRef={emailRef}
                                    />
                                    <AnimatedButton emailRef={emailRef} />
                                </HStack>


                            </VStack>

                            {/* <Text my={5} fontSize="sm" color="gray.500">
                            <Text as="span" color="purple.300">102+ </Text>
                            builders have signed up in the last
                            <Text as="span" color="purple.300"> 30</Text> days
                        </Text> */}
                        </Container>
                    </VStack>
                </div>
            </Center>
        </Container>
    );
};

interface AnimatedInputProps {
    placeholder: string;
    emailRef: React.RefObject<HTMLInputElement>;
}

function AnimatedInput({ placeholder, emailRef }: AnimatedInputProps) {
    const [isClicked, setIsClicked] = useState(false);

    function handleInputClick() {
        setIsClicked(true);
    }

    return (
        <Input
            ref={emailRef}
            type="email"
            placeholder={placeholder}
            onClick={handleInputClick}
            onFocus={handleInputClick}
            transition="color 0.2s ease-in-out"
            // When the input is clicked, transition the color to white. If it's not clicked, transition the color to gray.400
            color={isClicked ? "white" : "gray.400"}
        />
    );
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

interface AnimatedButtonProps {
    emailRef: React.RefObject<HTMLInputElement>;
}

function AnimatedButton({ emailRef }: AnimatedButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [isShowingInvalidEmail, setIsShowingInvalidEmail] = useState(false); // new state variable


    function handleClick() {
        setIsSubmitting(true);
        setIsInvalidEmail(false);
        setIsValidEmail(false);
        setIsShowingInvalidEmail(false);

        const isValid = validateEmail(emailRef.current?.value ?? "");
        setIsValidEmail(isValid);

        if (!isValid) {
            setIsInvalidEmail(true);
            setIsShowingInvalidEmail(true); // set isShowingInvalidEmail to true
            setTimeout(() => {
                setIsShowingInvalidEmail(false); // set isShowingInvalidEmail back to false after one second
            }, 1000);
        } else if (!isEmailValidated) {
            setIsEmailValidated(true);
            set(ref(db, 'emails/' + (emailRef.current?.value)?.replace('.', '-')), {
                email: emailRef.current?.value,
                timestamp: Date.now()
            });
        }

        setTimeout(() => {
            setIsSubmitting(false);
        }, 500);
    }

    useEffect(() => {
        if (isInvalidEmail) {
            setTimeout(() => {
                setIsInvalidEmail(false);
            }, 1000);
        }
    }, [isInvalidEmail]);

    return (
        <Button
            colorScheme="brand"
            variant="solid"
            bgColor={
                isInvalidEmail
                    ? "red.500"
                    : isValidEmail
                        ? "green.500"
                        : isEmailValidated
                            ? "green.500"
                            : "brand.500"
            }
            _hover={
                isEmailValidated
                    ? {}
                    : { bgColor: isSubmitting ? "brand.500" : "brand.600" }
            }
            _focus={{ outline: "none" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            position="relative"
            onClick={handleClick}
            disabled={isSubmitting || isEmailValidated}
        >
            {
                isValidEmail ? (
                    <Text color="white" fontSize="lg" fontWeight="bold" >
                        ✓
                    </Text>
                ) : isSubmitting ? (
                    <Spinner size="sm" color="white" thickness='2px' />
                ) : isShowingInvalidEmail ? ( // show X for one second if isShowingInvalidEmail is true
                    <Text color="white" fontSize="lg" fontWeight="bold">
                        ✕
                    </Text>
                ) : (
                    <Text
                        color="white"
                        fontSize="lg"
                        fontWeight="bold"
                        transition="all 0.2s ease-in-out"
                        opacity={1}
                        transform={isHovered ? "translateX(10px)" : "translateX(0)"}
                    >
                        →
                    </Text>
                )}
        </Button >
    );
}