import { Input, Button, useDisclosure, useColorMode } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react"
import Tags from './Tags';
import CoverImage from './CoverImage';

export default function RightDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();


    return (
        <div>
            <Button refs={btnRef} colorScheme="teal" onClick={onOpen}>
                Publish
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>PUBLISH BLOG</DrawerHeader>

                        <DrawerBody>
                            <Tags />
                            <CoverImage />
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue">PUBLISH</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    )
}
