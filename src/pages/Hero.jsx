import {
    Box,
    Flex,
    Button,
    Stack,
    Text,
    useColorModeValue,

} from '@chakra-ui/react';

export default function FullPageHero() {
    return (
        <>
            <Flex
                minH={'100vh'}
                direction={'column'}
                align={'center'}
                justify={'center'}
                bgGradient={{
                    b: useColorModeValue(
                        'linear(to-tr, purple.700, purple.600)',
                        'linear(to-tr, purple.300, purple.200)'
                    ),
                }}>
                <Stack spacing={8} align={'center'}>
                    <Text
                        fontSize={{ base: '4xl', md: '6xl' }}
                        color={useColorModeValue('gray.800', 'white')}>
                        My Awesome App
                    </Text>
                    <Text
                        fontSize={{ base: 'md', lg: 'lg' }}
                        color={useColorModeValue('gray.600', 'gray.300')}
                        maxW={{ base: 'xl', lg: '2xl' }}>
                        A wonderful new app that will change your life forever. Try it now!
                    </Text>
                    <Stack direction={'row'} spacing={6}>
                        <Button
                            bg={'purple.400'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'purple.500' }}
                        // TODO: Add onClick function
                        >
                            Get started
                        </Button>
                        <Button
                            bg={'gray.300'}
                            rounded={'full'}
                            color={'gray.800'}
                            _hover={{ bg: 'gray.400' }}
                        // TODO: Add onClick function
                        >
                            Learn more
                        </Button>
                    </Stack>
                </Stack>
                <Box position={'absolute'} bottom={'5%'} width={'full'}>
                    <Flex
                        align={'center'}
                        justify={'center'}
                        width={'full'}
                        bg={useColorModeValue('white', 'gray.800')}>
                        <Text
                            color={useColorModeValue('gray.700', 'gray.200')}
                            fontSize={'sm'}>
                            Made with ❤ by Your Name
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}