import { Box, Flex, HStack, IconButton, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGooglePlay, FaInstagram, FaTwitter, FaApple } from 'react-icons/fa';

export default function LargeFooterWithSocialAndAppLinks() {
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
            <Box
                px={{ base: 4, md: 8 }}
                py={16}
                mx="auto"
                maxW="7xl"
                direction={{ base: 'column', lg: 'row' }}>
                <Stack spacing={6} mx={{ lg: '8' }} my={{ base: 8, lg: 0 }}>
                    <Box>
                        <Text fontWeight="bold" fontSize="xl" mb="2">
                            About Us
                        </Text>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut dolor eget enim accumsan posuere vel vel
                            enim.
                        </Text>
                    </Box>
                    <Stack direction="row" spacing={4}>
                        <Link href="#" fontSize="xl">
                            <FaFacebook />
                        </Link>
                        <Link href="#" fontSize="xl">
                            <FaTwitter />
                        </Link>
                        <Link href="#" fontSize="xl">
                            <FaInstagram />
                        </Link>
                        <Link href="#" fontSize="xl">
                            <FaGithub />
                        </Link>
                    </Stack>
                </Stack>
                <Flex flexWrap="wrap" direction={{ base: 'column', md: 'row' }} justify="space-between">
                    <Box>
                        <Text fontWeight="bold" fontSize="xl" mb="2">
                            Company
                        </Text>
                        <Stack as="ul" spacing={2} color={useColorModeValue('gray.600', 'gray.400')}>
                            <Link href="#">About Us</Link>
                            <Link href="#">Careers</Link>
                            <Link href="#">Contact Us</Link>
                            <Link href="#">Support</Link>
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Terms of Service</Link>
                        </Stack>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" fontSize="xl" mb="2">
                            Links
                        </Text>
                        <Stack as="ul" spacing={2} color={useColorModeValue('gray.600', 'gray.400')}>
                            <Link href="#">Home</Link>
                            <Link href="#">Blog</Link>
                            <Link href="#">Pricing</Link>
                            <Link href="#">Documentation</Link>
                            <Link href="#">Our Work</Link>
                        </Stack>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" fontSize="xl" mb="2">
                            Download
                        </Text>
                        <Stack as="ul" spacing={2} color={useColorModeValue('gray.600', 'gray.400')}>
                            <Link href="#">
                                <HStack>
                                    <IconButton
                                        icon={<FaApple />}
                                        size="md"
                                        variant="ghost"
                                        aria-label="Download on App Store"
                                    />
                                    <Text>iOS</Text>
                                </HStack>
                            </Link>
                            <Link href="#">
                                <HStack>
                                    <IconButton
                                        icon={<FaGooglePlay />}
                                        size="md"
                                        variant="ghost"
                                        aria-label="Download on Google Play"
                                    />
                                    <Text>Android</Text>
                                </HStack>
                            </Link>
                        </Stack>
                    </Box>
                </Flex>
            </Box>
            <Box bg={useColorModeValue('gray.100', 'gray.800')}>
                <Box
                    px={{ base: 4, md: 8 }}
                    py={4}
                    mx="auto"
                    maxW="7xl"
                    direction={{ base: 'column', lg: 'row' }}
                    alignItems={{ base: 'center' }}
                    justifyContent={{ lg: 'space-between' }}>
                    <Text color="gray.600" fontSize="md">
                        © 2022 Large Footer. All rights reserved.
                    </Text>
                    <HStack spacing={4} mt={{ base: 4, lg: 0 }}>
                        <Link href="#">
                            <FaFacebook />
                        </Link>
                        <Link href="#">
                            <FaTwitter />
                        </Link>
                        <Link href="#">
                            <FaInstagram />
                        </Link>
                        <Link href="#">
                            <FaGithub />
                        </Link>
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
}