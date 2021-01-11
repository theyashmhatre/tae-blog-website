import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io"
import { GiHamburgerMenu } from "react-icons/gi"
import { Box, Heading, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

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

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg="gray.900"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    <Link href="/"><a>The Adventurous Engineer</a></Link>
                </Heading>
            </Flex>

            <Box display={{ base: "block", md: "none" }} fontSize="30px" onClick={toggleMenu}>
                {show ? <IoMdClose /> : <GiHamburgerMenu />}
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "block" }}
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
                    <MenuItems ><Link href="/"><a className="link-redirect">Home</a></Link></MenuItems>
                </Flex>
            </Box>
        </Flex>
    );
}
