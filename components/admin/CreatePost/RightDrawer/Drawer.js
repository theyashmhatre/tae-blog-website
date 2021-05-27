import { Input, Button, useDisclosure, useColorMode, useToast } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react"
import Tags from './Tags';
import CoverImage from './CoverImage';
import BlockContext from '../../../../context/BlockContext';
import Axios from 'axios';
import data from "../AddBlock/objects/data"
import Description from './Description';
import {useAuth} from "../../../../lib/auth";


//Right Drawer which conatins tags, cover image and publish button
export default function RightDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const {blocks,setBlocks} = useContext(BlockContext);
    const toast = useToast();  //chakra UI method

    // const auth = useAuth();

    // const { user, loading } = useAuth();


    function checkMediaUploadStatus() {
        let filesUploaded = true;
        blocks.some(function (block) {
            if (block.imageUploaded === false || block.videoUploaded === false || block.coverImageUploaded === false) {
                toast({
                    title: 'Some images/videos are not uploaded.',
                    description: "Please upload or remove them and try again!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-right'
                });
                filesUploaded = false;
                return true;
            }
        });

        return filesUploaded;
    }


    async function uploadBlogPost() {
        const date = new Date();

        //object to be sent to the api for uploading
        const completeBlockObject = {
            blogId : new Date().valueOf(),
            blogUID: blocks[0]._uid,
            blocks : blocks,
            blogTitle : blocks[0].value,
            blogDescription: blocks[0].blogDescription,
            coverImageUploaded : blocks[0].coverImageUploaded,
            uploadedAt : date,
            userUID: "user.uid",
            postedBy: "user.name",
        };


        let allFilesUploaded = checkMediaUploadStatus();
        
       if (allFilesUploaded) {
           await Axios.post("/api/admin/submit-post/", completeBlockObject)
               .then((res) => {
                   toast({
                       title: "Blog uploaded successfully! 🎉",
                       description: "Get some rest now.",
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
    }

    async function saveDraftPost() {
        const date = new Date();

        //object to be sent to the api for uploading
        const completeBlockObject = {
            blogId: new Date().valueOf(),
            blogUID: blocks[0]._uid,
            blocks: blocks,
            blogTitle: blocks[0].value,
            blogDescription: blocks[0].blogDescription,
            coverImageUploaded: blocks[0].coverImageUploaded,
            uploadedAt: date,
            userUID: "user.uid",
            postedBy: "user.name",
        };


        let allFilesUploaded = checkMediaUploadStatus();

        if (allFilesUploaded) {
            await Axios.post("/api/admin/upload-draft/", completeBlockObject)
                .then((res) => {
                    toast({
                        title: "Draft saved successfully!",
                        description: "Can't wait to see the completed version😋",
                        status: "success",
                        duration: 7000,
                        isClosable: true,
                        position: 'bottom-right'
                    });
                }).then(() => {
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
    }

    return (
        <div>
            <Button refs={btnRef} colorScheme="teal" onClick={()=>{onOpen()}}>
                Publish
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={() => { onClose()}}
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
                            <Button variant="outline" mr={3} onClick={()=> {saveDraftPost();}}>
                                Save Draft
                            </Button>
                            <Button colorScheme="blue" onClick={uploadBlogPost}>PUBLISH</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    )
}
