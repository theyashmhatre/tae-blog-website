import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io"
import { GiHamburgerMenu } from "react-icons/gi"
import { Box, Heading, Flex, Text, Button, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import MenuDrawer from './MenuDrawer/MenuDrawer'

const MenuItems = props => {
    const { children, isLast, to = "/", ...rest } = props
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            {...rest}
        >
            <Link href={to}>{children}</Link>
        </Text>
    )
}

export default function Header(props) {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
    const { colorMode, toggleColorMode } = useColorMode();
    const [windowWidth, setWindowWidth] = useState();

    if (typeof window === 'undefined') {
        global.window = {}
    }

    useEffect(() => {
        console.log("inner with change", window.innerWidth);

        window.addEventListener("resize", updateWidth);
    }, []);

    function updateWidth() {
        setWindowWidth(window.innerWidth);
    }

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={[6, 8]}
            bg="gray.900"
            color="white"
            {...props}
        >

            {/* Blog Title */}
            <Flex align="center" mr={[2, 5]}>
                <Heading as="h1" size="lg" fontSize={["21px", "30px", "30px", "35px"]} letterSpacing={"-.07rem"}>
                    <Link href="/"><a>The Adventurous Engineer</a></Link>
                </Heading>
            </Flex>

            {windowWidth < 1031 || window.innerWidth < 1031 ?
                <MenuDrawer /> : <Box
                    display={{ base: show ? "block" : "none", md: "flex" }}
                    flexBasis={{ base: "100%", md: "auto" }}
                >
                    <Flex
                        align={["center", "center", "center", "center"]}
                        justify={["center", "space-between", "flex-end", "flex-end"]}
                        direction={["column", "row", "row", "row"]}
                        pt={[4, 4, 0, 0]}
                    >
                        <MenuItems ><Link href="/"><a className="link-redirect">Home</a></Link></MenuItems>
                        <MenuItems ><Link href="/blogs"><a className="link-redirect">Blogs</a></Link></MenuItems>
                        <MenuItems ><Link href="/admin/create-post"><a className="link-redirect">Contact Us</a></Link></MenuItems>
                        <Button _hover={{ border: "1px solid white" }} border="1px solid gray" color="white" colorScheme="gray.700" onClick={toggleColorMode}>{colorMode === "light" ? "Dark" : "Light"} Mode</Button>
                    </Flex>
                </Box>}
        </Flex>
    );
}
