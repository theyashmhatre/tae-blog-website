import { Input, Button, useDisclosure, useColorMode, useToast } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react"
import Tags from './Tags';
import CoverImage from './CoverImage';
import BlockContext from '../../../../context/BlockContext';
import Axios from 'axios';
import data from "../AddBlock/objects/data"
import disableScroll from 'disable-scroll';
import Description from './Description';


//Right Drawer which conatins tags, cover image and publish button
export default function RightDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const {blocks,setBlocks} = useContext(BlockContext);
    const toast = useToast();  //chakra UI method


    async function uploadBlogPost() {
        const date = new Date();

        //object to be sent to the api for uploading
        const completeBlockObject = {
            blogId : new Date().valueof(),
            blocks : blocks,
            blogTitle : blocks[0].value,
            blogDescription: blocks[0].blogDescription,
            coverImageUploaded : blocks[0].coverImageUploaded,
            uploadedAt : date,
        };
        
        await Axios.post("/api/admin/submit-post",completeBlockObject)
        .then((res)=>{
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
            <Button refs={btnRef} colorScheme="teal" onClick={()=>{onOpen();disableScroll.on()}}>
                Publish
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={() => { onClose();disableScroll.off()}}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>PUBLISH BLOG</DrawerHeader>

                        <DrawerBody>
                            <Tags />
                            <Description />
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
