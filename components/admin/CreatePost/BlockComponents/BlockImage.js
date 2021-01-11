import React, { useState, useContext } from 'react'
import { Button, Heading, Progress, Image, Box, Center, Container, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { storage } from "../../../../config/config";
import { useToast } from "@chakra-ui/react"
import { AiOutlineCloudUpload} from "react-icons/ai"
import BlockContext from "../../../../context/BlockContext"
import { RiCloseCircleFill } from 'react-icons/ri';
import Axios from "axios";


//This component will be dynamically added to the CreatePost Stack when Image is clicked in the Modal
export default function BlockImage(props) {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [desc, setDesc] = useState('');
    const [progress, setProgress] = useState(0);  //keeps track of progress of image upload
    const [Url, setUrl] = useState('');  //url that is generated after upload successfull on firebase
    const toast = useToast();  //chakra UI method
    const { blocks, setBlocks } = useContext(BlockContext);

    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const closeIconValue = useColorModeValue("#1A202C", "white");

    //executes once the file is selected or changed.
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
                raw: e.target.files[0]
            });
        }
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
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage 
    }

    //uploads the image on firebase in the directory images/ after the user clicks on upload
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

        const uploadTask = storage.ref(`${blocks[0]._uid}` +"/images/" +`${image.raw.name}`).put(image.raw);
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
                    .ref(blocks[0]._uid+"/images")
                    .child(image.raw.name)
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
        <div>
            {/* CLose Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <IconButton onClick={removeBlock} bgColor={closeButtonValue} aria-label="Remove Block" icon={<RiCloseCircleFill size="25px" color={closeIconValue} />} />
            </div>


            <label htmlFor="upload-button">

                {/* displays the preview if it exists else the input area */}
                {/* Hides the preview if image already uploaded */}
                {image.preview || props.block.imageUploaded ? (
                    props.block.imageUploaded === true ? <></> :
                        <img src={image.preview} alt="dummy" width="300" height="300"
                            style={{ display: "block", margin: "auto" }}
                        />
                ) : (
                        <>
                            <Box w={["100%","50%","50%"]} color="white" bgColor="gray.800" border="1px solid black" borderRadius="5px" padding="5px 5px" margin="auto">
                                <input type="file" onChange={handleChange} />
                            </Box>
                        </>
                    )}
            </label>
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
            {progress === 100 || props.block.imageUploaded ?
                <></> :
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                    <Button leftIcon={<AiOutlineCloudUpload size="20px" />} onClick={handleUpload} variant="solid" colorScheme="green">Upload</Button>
                </div>
            }

            {/* Image is shown once the url is successfully updated */}

            

            {/* Progress Bar Hides once it reaches 100 or if the image is already uploaded */}
            {progress === 100 || props.block.imageUploaded || !image.visible ? <></> : <Progress value={progress} />}

        </div>
    );
}
