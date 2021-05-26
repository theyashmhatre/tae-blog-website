import { useToast, Button, Container, Image, Text, IconButton, useColorModeValue, Box } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from '../../../../context/BlockContext';
import { storage } from "../../../../config/config"
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiCloseCircleFill } from 'react-icons/ri';
import {hasExtension} from "../BlockComponents/utils/utils";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styles from "../BlockComponents/styles/BlockImage.module.css";

export default function CoverImage() {
    const { blocks, setBlocks } = useContext(BlockContext);
    const [image, setImage] = useState({ preview: "", raw: "", visible: false, uploaded: blocks[0].coverImageUploaded });
    const [Url, setUrl] = useState('');
    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const closeIconValue = useColorModeValue("#1A202C", "white");

    const toast = useToast();  //chakra UI
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
            const isSupported = hasExtension('cover-image', ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.webp', '.svg']);
            if (isSupported) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
                    raw: e.target.files[0],
                    visible: true,
                    uploaded: false,
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
    };

    const handleUpload = async e => {
        e.preventDefault();

        if (!image.raw) {  // if user hasn't loaded any input image, it'll display an error toast
            toast({
                title: "No image uploaded",
                description: "Please upload an image and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }

        const uniqueImageId = uniqid(`${image.raw.name}-`);

        const uploadTask = storage.ref(`${blocks[0]._uid}/cover/${uniqueImageId}`).put(image.raw);
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
                    .ref(blocks[0]._uid + "/cover")
                    .child(uniqueImageId)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        blocks[0].coverImageUrl = url;   // this adds the url to the block
                        blocks[0].coverImageUploaded = true;
                        localStorage.setItem('componentList', JSON.stringify(blocks));
                    }).then(() => {
                        setImage({
                            preview: "", //Offline preview url
                            raw: "",
                            visible: false,
                            uploaded: true,
                        });
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
        const imageURL = blocks[0].coverImageUrl;
        if (imageURL) {
            let imageToBeDeleted = storage.refFromURL(imageURL);
            imageToBeDeleted.delete().then(() => {
                blocks[0].coverImageUrl = '';
                blocks[0].coverImageUploaded = false;
                localStorage.setItem('componentList', JSON.stringify(blocks));
            }).then(() => {
                setImage({
                    preview: "", //Offline preview url
                    raw: "",
                    visible: false,
                });
            }).then(() => {
                toast({
                    title: "Cover Image Deleted Successfully.",
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
            setImage({
                preview: "", //Offline preview url
                raw: "",
                visible: false,
            });
        }
    }

    return (
        <div>
            <Text fontWeight="bold" letterSpacing="0.5px">
                Cover Image:
            </Text>

            {/* CLose Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginBottom:"10px" }}>
                {/* hides the Upload button once the upload is complete i.e. Progress reaches 100 or imageUploaded=true */}
                {image.uploaded ?
                    <></> :
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                        <Button disabled={image.visible ? false : true} onClick={handleUpload} colorScheme="blue">Upload</Button>
                    </div>
                }
                <Box marginBottom="7px" marginLeft="10px">
                    <RiCloseCircleFill onClick={removeBlock} cursor="pointer" aria-label="Remove Block" bgColor={closeButtonValue} size="25px" color={closeIconValue} />
                </Box>
            </div>
            <label htmlFor="upload-button">

                {/* displays the preview if it exists else the input area */}
                {/* Hides the preview if image already uploaded */}
                {image.preview || image.visible || image.uploaded ? (
                    image.uploaded ? <></> :
                        <img src={image.preview} alt="dummy" width="300" height="300"
                            style={{ display: "block", margin: "auto" }}
                        />
                ) : (
                    <>
                        <Box w={["100%"]} color="white" bgGradient="linear(to-r, #83eaf1, #63a4ff)" boxShadow={useColorModeValue("4px 0px 10px 0px lightblue", "0px 0px 8px 0px darkgrey")} borderRadius="5px" margin="auto">
                            <div className={styles.css}>
                                <label htmlFor='cover-image' className={styles.label} >
                                    <AiOutlineCloudUpload size="25px" style={{marginRight:"10px"}} />
                                    Select a Cover Image
                                </label>
                                    <input id='cover-image' type='file' style={{ display: "none" }} onChange={handleChange}  />
                            </div>
                        </Box>
                    </>
                )}
            </label>
            <br />

            

            {/* Image is shown once the url is successfully updated */}

            {image.uploaded || blocks[0].coverImageUploaded ?
                <div>
                    <Container>
                        <Image src={blocks[0].coverImageUrl} fit="contain" />
                    </Container>
                </div> : <></>}
        </div>
    )
}
