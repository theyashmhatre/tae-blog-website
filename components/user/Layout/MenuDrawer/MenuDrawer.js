import React, { useContext, useRef } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Box,
    MenuItem,
    useColorMode,
    HStack,
    Spacer
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineHome } from "react-icons/ai";
import { IoMdListBox, IoMdContact } from "react-icons/io";
import { RiLightbulbFlashLine, RiMoonClearFill } from "react-icons/ri";
import { MdWbSunny } from "react-icons/md";
import Link from "next/link"
import DrawerMenuItem from './DrawerMenuItem';

export default function MenuDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { colorMode, toggleColorMode } = useColorMode();
    const buttonColor = colorMode === "light" ? "black" : "white";

    return (
        <>
            <Box fontSize={["20px", "30px"]} onClick={onOpen}>
                {<GiHamburgerMenu size="40px" />}
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>

                        <DrawerHeader borderBottomWidth="1px" padding="20px 20px">
                            <HStack>
                                <h2 style={{ fontWeight: "bold" }}>Menu</h2>
                                <Spacer />
                                <GiHamburgerMenu size="30px" onClick={onClose} />
                            </HStack>
                        </DrawerHeader>




                        <DrawerBody>
                            <DrawerMenuItem
                                name="Home"
                                icon= <AiOutlineHome size="30px" />
                                link = "/"
                        />
                        <DrawerMenuItem
                                name="Blogs"
                                icon= <IoMdListBox size="30px" />
                                link = "/blogs"
                        />
                        <DrawerMenuItem
                                name="Contact Us"
                                icon= <IoMdContact size="30px" />
                                link = "/admin/create-post"
                        />
                            <HStack marginTop="10px" padding="10px 5px" spacing={6}>
                                {colorMode === "light" ? <RiMoonClearFill size="30px" /> : <MdWbSunny size="30px" />}
                                <Button _hover={{ border: "1px solid white" }} fontSize="20px" border="1px solid gray" color={buttonColor} colorScheme="gray.700" onClick={toggleColorMode}>{colorMode === "light" ? "Dark" : "Light"} Mode</Button>
                            </HStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}
