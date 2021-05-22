import React, { useContext, useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, useColorMode, Spacer, IconButton, toast, useToast } from "@chakra-ui/react"
import { AiFillSetting } from 'react-icons/ai';
import BlockContext from '../../../../context/BlockContext';
import data from "../AddBlock/objects/data"
import axios from 'axios';
import { useAuth } from "../../../../lib/auth";


//Left Drawer which contains Clear All and Toggle Mode buttons
export default function LeftDrawer() {
    const{blocks,setBlocks} = useContext(BlockContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { colorMode, toggleColorMode } = useColorMode(); //chakra ui's color mode
    const { user, loading } = useAuth();
    const toast = useToast();  //chakra UI method

    //once, the admin clicks on Clear All button, it'll set the blocks to it's previous value and also the localstorage as well
    async function clearBlockList() {

        const clearData = {
            _uid: blocks[0]._uid,
            userUID: user.uid,
        }

        await axios.post('/api/admin/clearBlogMedia/', clearData)
            .then((res) => {
                toast({
                    title: "Blog data cleared successfully! 🎉",
                    description: "Including media from our database.",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }).then(() => {
                setBlocks(data.content.body);
                localStorage.setItem('componentList', JSON.stringify(data.content.body));
                onClose();
            }).catch((err) => {

                //receives a list of error from the api
                const errors = err.response.data.errors;

                //maps the error list into error toasts
                if (errors) {
                    errors.map((error) => {
                        toast({
                            title: error,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: 'bottom-right'
                        });
                    });
                }
            });
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
