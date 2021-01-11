import React, { useContext, useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, useColorMode, Spacer, IconButton } from "@chakra-ui/react"
import { AiFillSetting } from 'react-icons/ai';
import BlockContext from '../../../../context/BlockContext';
import data from "../AddBlock/objects/data"

export default function LeftDrawer() {
    const{blocks,setBlocks} = useContext(BlockContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { colorMode, toggleColorMode } = useColorMode();

    function clearBlockList() {
        setBlocks(data.content.body);
        localStorage.setItem('componentList', JSON.stringify(data.content.body));
    }


    return (
        <div>
            <IconButton ref={btnRef} icon={<AiFillSetting size="25px" />} colorScheme="teal" onClick={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Settings</DrawerHeader>

                        <DrawerBody>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center",margin:"20px 0px 30px 0px" }}>
                                <Button colorScheme="red" onClick={clearBlockList} alignItems="center">
                                    Clear all
                            </Button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <header>
                                    <Button onClick={toggleColorMode}>
                                        {colorMode === "light" ? "Dark" : "Light"} Mode
                                    </Button>
                                </header>
                            </div>

                        </DrawerBody>

                        <DrawerFooter>
                            <Button onClick={onClose} color="blue">Done</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    )
}
