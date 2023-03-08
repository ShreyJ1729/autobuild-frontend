import {
    Box,
    Flex,
    Link,
    useColorMode,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Text
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    SunIcon,
    MoonIcon,
} from '@chakra-ui/icons';

export default function WithSubnavigationAndDarkModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();

    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    const NAV_ITEMS: Array<NavItem> = [
        {
            label: 'Inspiration',
            children: [
                {
                    label: 'Explore Design Work',
                    subLabel: 'Trending Design to inspire you',
                    href: '#',
                },
                {
                    label: 'New & Noteworthy',
                    subLabel: 'Up-and-coming Designers',
                    href: '#',
                },
            ],
        },
        {
            label: 'Find Work',
            children: [
                {
                    label: 'Job Board',
                    subLabel: 'Find your dream design job',
                    href: '#',
                },
                {
                    label: 'Freelance Projects',
                    subLabel: 'An exclusive list for contract work',
                    href: '#',
                },
            ],
        },
        {
            label: 'Learn Design',
            href: '#',
        },
        {
            label: 'Hire Designers',
            href: '#',
        },
    ];

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                    display={{ base: 'none', md: 'flex' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Logo
                    </Text>

                    <Flex ml={10}>
                        <DesktopNav
                            linkColor={linkColor}
                            linkHoverColor={linkHoverColor}
                            popoverContentBgColor={popoverContentBgColor}
                            navItems={NAV_ITEMS}
                        />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <IconButton
                        size={'md'}
                        fontSize={'lg'}
                        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'
                            } mode`}
                        variant={'ghost'}
                        colorScheme={'pink'}
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}>
                        Sign In
                    </Button>
                    <Button
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        href={'#'}
                        _hover={{
                            bg: 'pink.300',
                        }}>
                        Sign Up
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav
                    navItems={NAV_ITEMS}
                    linkColor={linkColor}
                    linkHoverColor={linkHoverColor}
                />
            </Collapse>
        </Box>
    );
}

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const DesktopNav = ({
    linkColor,
    linkHoverColor,
    popoverContentBgColor,
    navItems,
}: {
    linkColor: string;
    linkHoverColor: string;
    popoverContentBgColor: string;
    navItems: Array<NavItem>;
}) => {
    return (
        <Stack direction={'row'} spacing={4}>
            {navItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text transition={'all .3s ease'} fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({
    linkColor,
    linkHoverColor,
    navItems,
}: {
    linkColor: string;
    linkHoverColor: string;
    navItems: Array<NavItem>;
}) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {navItems.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    {...navItem}
                    linkColor={linkColor}
                    linkHoverColor={linkHoverColor}
                />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({
    label,
    children,
    href,
    linkColor,
    linkHoverColor,
}: NavItem & {
    linkColor: string;
    linkHoverColor: string;
}) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={linkColor}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link
                                key={child.label}
                                py={2}
                                href={child.href}
                                color={linkColor}
                                _hover={{ textDecoration: 'none', color: linkHoverColor }}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};
