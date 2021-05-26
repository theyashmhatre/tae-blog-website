import React, { useState, useContext } from 'react'
import { Button, Heading, Progress, Image, Box, Center, Container, IconButton, Text, useColorModeValue, HStack, Spacer, Icon } from "@chakra-ui/react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { storage } from "../../../../config/config";
import { useToast } from "@chakra-ui/react"
import { AiOutlineCloudUpload } from "react-icons/ai"
import BlockContext from "../../../../context/BlockContext"
import { RiCloseCircleFill } from 'react-icons/ri';
import { CgArrowUpO, CgArrowDownO } from "react-icons/cg";
import Axios from "axios";
import { swapElement } from "./utils/utils";
import styles from "./styles/BlockImage.module.css";
import {hasExtension} from './utils/utils';
import uniqid from "uniqid";


//This component will be dynamically added to the CreatePost Stack when Image is clicked in the Modal
export default function BlockImage(props) {
    const [image, setImage] = useState({ preview: "", raw: "", visible: false });
    const [desc, setDesc] = useState('');
    const [progress, setProgress] = useState(0);  //keeps track of progress of image upload
    const [Url, setUrl] = useState('');  //url that is generated after upload successfull on firebase
    const toast = useToast();  //chakra UI method
    const { blocks, setBlocks } = useContext(BlockContext);

    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const iconValue = useColorModeValue("#1A202C", "white");

    //executes once the file is selected or changed.
    const handleChange = e => {
        if (e.target.files[0]) {
            if (hasExtension(props.block._uid, ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.webp', '.svg'])) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
                    raw: e.target.files[0],
                    visible: true,
                });
            }
            else{
                toast({
                    title: "Image format not supported",
                    description: "Supported formats are .jpeg, .jpg, .png, .gif, .tiff, .webp, .svg",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        console.log(e, image);
    };

    function handleDescChange(editableValue) {
        const value = editableValue;
        setDesc({
            ...desc,
            editableValue: value
        });
    }

    function onBlur(e) {
        props.block.imageDesc = Object.values(desc)[0];
        console.log(props.block.imageDesc);
        if (props.block.imageDesc) {
            localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage 
        }
    }

    //uploads the image on firebase in the directory images/ after the user clicks on upload
    const handleUpload = async e => {
        e.preventDefault();

        if (!image.raw) {  // if user hasn't loaded any input image, it'll display an error toast
            toast({
                title: "No image selected",
                description: "Please select an image and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }

        const uniqueImageId = uniqid(`${image.raw.name}-`);

        const uploadTask = storage.ref(`${blocks[0]._uid}` + "/images/" + `${uniqueImageId}`).put(image.raw);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
                props.block.imageUploaded = false;
            },
            () => {
                storage
                    .ref(blocks[0]._uid + "/images")
                    .child(uniqueImageId)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        props.block.url = url;   // this adds the url to the block
                        props.block.imageUploaded = true;
                        localStorage.setItem('componentList', JSON.stringify(blocks));
                    }).then(() => {
                        toast({
                            title: "Image uploaded Successfully.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: 'bottom-right'
                        });
                    });
            }
        );
    };

    function removeBlock() {
        if (props.block.url) {
            let imageToBeDeleted = storage.refFromURL(props.block.url);
            imageToBeDeleted.delete().then(() => {
                const newList = blocks.filter((block) => block._uid !== props.block._uid);
                setBlocks(newList);
                localStorage.setItem('componentList', JSON.stringify(blocks));
            }).then(() => {
                toast({
                    title: "Image Deleted Successfully.",
                    description: "Image is successfully deleted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }).catch((error) => {
                toast({
                    title: "An error occurred",
                    description: "Refresh the page and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
        }
        else {
            const newList = blocks.filter((block) => block._uid !== props.block._uid)
            setBlocks(newList);
        }
    }

    return (
        <Box borderRadius="5px" backgroundColor={useColorModeValue("#FFFFFF", "blackAlpha.500")} border={useColorModeValue("1px solid lightblue", "0px")} padding="20px">
            {/* CLose Button */}
            <div style={{marginBottom:"10px"}}>
                <HStack>
                    <Icon color={props.index > 1 ? iconValue : "gray"} as={CgArrowUpO} w={6} h={6} cursor="pointer" onClick={() => { swapElement(props.index, setBlocks, "up") }}></Icon>
                    <Icon color={blocks.length > props.index + 1 ? iconValue : "gray"} as={CgArrowDownO} w={6} h={6} cursor="pointer" onClick={() => { swapElement(props.index, setBlocks, "down") }}></Icon>
                    <Spacer />
                    {progress === 100 || props.block.imageUploaded ?
                        <></> :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                            <Button disabled={image.visible ? false : true} leftIcon={<AiOutlineCloudUpload size="20px" />} onClick={handleUpload} variant="solid" colorScheme="green">Upload</Button>
                        </div>
                    }
                    <RiCloseCircleFill onClick={removeBlock} cursor="pointer" aria-label="Remove Block" bgColor={closeButtonValue} size="25px" color={iconValue} />
                </HStack>
            </div>

                {/* displays the preview if it exists else the input area */}
                {/* Hides the preview if image already uploaded */}
                {image.preview || props.block.imageUploaded ? (
                    props.block.imageUploaded === true ? <></> :
                        <img src={image.preview} alt="dummy" width="300" height="300"
                            style={{ display: "block", margin: "auto" }}
                        />
                ) : (
                    <>
                            <Box w={["100%", "50%", "50%"]} color="white" bgGradient="linear(to-r, #83eaf1, #63a4ff)" boxShadow={useColorModeValue("4px 0px 10px 0px lightblue", "0px 0px 8px 0px darkgrey")} borderRadius="5px" margin="auto">
                            <div className={styles.css}>
                                <label htmlFor={props.block._uid} className={styles.label} >
                                    <AiOutlineCloudUpload size="25px" style={{marginRight:"10px"}} />
                                    Select an Image
                                </label>
                                <input id={props.block._uid} type='file' style={{ display: "none" }} onChange={handleChange} accept="image/jpeg, image/jpg, image/png, image/gif, image/tiff, image/webp, image/svg"  />
                            </div>
                        </Box>
                    </>
                )}
            <br />

            <div>
                <Container>
                    <Image src={props.block.url} fit="contain" />
                    <Center>
                        <Editable colorScheme="blue" placeholder="Write caption..." defaultValue={props.block.imageDesc} onBlur={onBlur} onSubmit={onBlur} onChange={(value) => { handleDescChange(value) }}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Center>
                </Container>
            </div>

            {/* hides the Upload button once the upload is complete i.e. Progress reaches 100 or imageUploaded=true */}

            {/* Image is shown once the url is successfully updated */}



            {/* Progress Bar Hides once it reaches 100 or if the image is already uploaded */}
            {progress === 100 || props.block.imageUploaded || progress === 0 ? <></> : <Progress value={progress} />}

        </Box>
    );
}
