import { Input, Button, useDisclosure, useColorMode, useToast } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react"
import Tags from './Tags';
import CoverImage from './CoverImage';
import BlockContext from '../../../../context/BlockContext';
import Axios from 'axios';
import data from "../AddBlock/objects/data"

export default function RightDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const {blocks,setBlocks} = useContext(BlockContext);
    const toast = useToast();  //chakra UI method


    async function uploadBlogPost() {
        const date = new Date();
        const completeBlockObject = {
            blocks : blocks,
            blogTitle : blocks[0].value,
            coverImageUploaded : blocks[0].coverImageUploaded,
            uploadedAt : date,
        };
        console.log(completeBlockObject);

        await Axios.post("/api/admin/submit-post",completeBlockObject)
        .then((res)=>{
            console.log("res",res);
            toast({
                title: "Blog uploaded successfully! 🎉",
                description: "Get some rest now.",
                status: "success",
                duration: 7000,
                isClosable: true,
                position: 'bottom-right'
            });
        }).then(()=>{
            setBlocks(data.content.body);
            localStorage.setItem('componentList', JSON.stringify(data.content.body));
            onClose();
        }).catch((err)=>{
            console.log(err.response);
            console.log("err",err.response.data);
            const errors = err.response.data.errors;
            console.log(errors);

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
                            <Button colorScheme="blue" onClick={uploadBlogPost}>PUBLISH</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    )
}
