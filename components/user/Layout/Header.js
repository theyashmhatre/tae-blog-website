import React, { useState, useEffect } from 'react'
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
    
    if (typeof window === 'undefined') {
        global.window = {}
    }
    
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    // useEffect(() => {
    //     console.log("inner with change", window.innerWidth);

    //     window.addEventListener("resize", updateWidth);
    // }, []);

    // function updateWidth() {
    //     setWindowWidth(window.innerWidth);
    // }

    var prevScrollpos = window.pageYOffset;
    console.log(prevScrollpos);
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-102px";
        }
        prevScrollpos = currentScrollPos;
    }

    return (
        <Flex
            as="nav"
            id="navbar"
            align="center"
            justify="space-between"
            wrap="wrap"
            p={[6, 7]}
            bg="gray.900"
            color="white"
            opacity="0.8"
            position="fixed"
            top={0}
            w="100%"
            zIndex="2"
            transition="top 0.6s"
            {...props}
        >

            {/* Blog Title */}
            <Flex align="center" mr={[2, 5]}>
                <Heading as="h1" size="lg" fontSize={["21px", "30px", "35px"]} letterSpacing={"-.07rem"}>
                    <Link href="/"><a>The Adventurous Engineer</a></Link>
                </Heading>
            </Flex>

            {/* {windowWidth < 2000 || window.innerWidth < 2000 ? */}
                <MenuDrawer />
                {/* <Box
                    display={{ md: "flex" }}
                    flexBasis={{ md: "auto" }}
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
                </Box>} */}
        </Flex>
    );
}
