import { AspectRatio, Box, Button, Center, Container, Editable, EditableInput, EditablePreview, HStack, IconButton, Progress, Spacer, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RiCloseCircleFill } from 'react-icons/ri';
import { CgArrowUpO, CgArrowDownO } from "react-icons/cg";
import BlockContext from '../../../../context/BlockContext';
import { storage } from "../../../../config/config"
import {swapElement} from "./utils/utils";
import styles from "./styles/BlockImage.module.css";
import {hasExtension} from "./utils/utils";
import uniqid from 'uniqid';

export default function VideoBlock(props) {

    const [video, setVideo] = useState({ preview: "", raw: "", visible: false, uploaded: false });
    const [desc, setDesc] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [progress, setProgress] = useState(0);  //keeps track of progress of image upload
    const [Url, setUrl] = useState('');  //url that is generated after upload successfull on firebase
    const toast = useToast();  //chakra UI method
    const { blocks, setBlocks } = useContext(BlockContext);

    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const closeIconValue = useColorModeValue("#1A202C", "white");

    const handleChange = e => {
        if (e.target.files[0]) {
            if (hasExtension(props.block._uid, ['.mp4', '.gif', '.mkv', '.webm', '.ogg'])) {
                setVideo({
                    preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
                    raw: e.target.files[0],
                    visible: true,
                    uploaded: false,
                });

            }
            else{
                toast({
                    title: "Video format not supported",
                    description: "Supported formats are .mp4, .gif, .mkv, .webm, .ogg",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
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
        console.log(props);
        props.block.videoDesc = Object.values(desc)[0];
        if (props.block.videoDesc) {
            localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage 
        }
    }

 

    //uploads the image on firebase in the directory images/ after the user clicks on upload
    const handleUpload = async e => {
        e.preventDefault();
        console.log(video);

        if (!video.raw) {  // if user hasn't loaded any input image, it'll display an error toast
            toast({
                title: "No file chosen",
                description: "Please select a video and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
        setShowProgressBar(true);

        const uniqueVideoId = uniqid(`${video.raw.name}-`);

        const uploadTask = storage.ref(`${blocks[0]._uid}` + "/videos/" + `${uniqueVideoId}`).put(video.raw);
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
                    .ref(blocks[0]._uid + "/videos")
                    .child(uniqueVideoId)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        props.block.url = url;   // this adds the url to the block
                        props.block.videoUploaded = true;
                        localStorage.setItem('componentList', JSON.stringify(blocks));
                    }).then(() => {
                        setVideo({
                            preview: "", //Offline preview url
                            raw: "",
                            uploaded: true,
                        });
                        setShowProgressBar(false);
                    }).then(() => {
                        toast({
                            title: "Video uploaded Successfully.",
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
            let videoToBeDeleted = storage.refFromURL(props.block.url);
            videoToBeDeleted.delete().then(() => {
                const newList = blocks.filter((block) => block._uid !== props.block._uid);
                setBlocks(newList);
                localStorage.setItem('componentList', JSON.stringify(blocks));
            }).then(() => {
                toast({
                    title: "Video Deleted Successfully.",
                    description: "Video is successfully deleted.",
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
            {/* hides the Upload button once the upload is complete i.e. Progress reaches 100 or imageUploaded=true */}
            {/* CLose Button */}
            <div style={{ marginBottom: "10px" }}>
                <HStack>
                    <IconButton disabled={props.index > 1 ? false : true} onClick={() => { swapElement(props.index, setBlocks, "up") }} bgColor={closeButtonValue} aria-label="Move Upward" icon={<CgArrowUpO size="25px" color={closeIconValue} />} />
                    <IconButton disabled={blocks.length > props.index + 1 ? false : true} onClick={() => { swapElement(props.index, setBlocks, "down") }} bgColor={closeButtonValue} aria-label="Move Downward" icon={<CgArrowDownO size="25px" color={closeIconValue} />} />
                    <Spacer />
                    {progress === 100 || props.block.videoUploaded ?
                        <></> :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                            <Button leftIcon={<AiOutlineCloudUpload size="20px" />} onClick={handleUpload} variant="solid" colorScheme="green">Upload</Button>
                        </div>
                    }
                    <IconButton onClick={removeBlock} bgColor={closeButtonValue} aria-label="Remove Block" icon={<RiCloseCircleFill size="25px" color={closeIconValue} />} />
                </HStack>
            </div>

            {video.uploaded || props.block.videoUploaded ? <></> :
                !video.preview ? 
                <label htmlFor="upload-button">
                    <Box w={["100%", "50%", "50%"]} color="white" bgGradient="linear(to-r, #74ebd5, #ACB6E5)" borderRadius="5px" boxShadow={useColorModeValue("4px 0px 10px 0px lightblue", "2px 0px 8px 0px darkgrey")} margin="auto">
                        <div className={styles.css}>
                            <label htmlFor={props.block._uid} className={styles.label}>
                                <AiOutlineCloudUpload size="25px" style={{ marginRight: "10px" }} />
                                    Select a Video
                                </label>
                            <input id={props.block._uid} type='file' style={{ display: "none" }} onChange={handleChange} />
                        </div>
                    </Box>
                </label> : <iframe
                frameBorder='0'
                width={["100%", "90%"]}
                height={["300px", "400px"]}
                title={props.block.videoDesc}
                src={video.preview}
                autoPlay={false}
                allowFullScreen
            />}

            {video.uploaded}
            <div>
                <Container>
                    {video.uploaded || props.block.videoUploaded ?
                        <iframe
                            frameBorder='0'
                            width={["100%", "90%"]}
                            height={["300px", "400px"]}
                            title={props.block.videoDesc}
                            src={props.block.url}
                            autoPlay={false}
                            allowFullScreen
                        />
                        : <></>}
                    <Center>
                        <Editable colorScheme="blue" placeholder="Write caption..." defaultValue={props.block.videoDesc} onBlur={onBlur} onSubmit={onBlur} onChange={(value) => { handleDescChange(value) }}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Center>
                </Container>
            </div>

            {showProgressBar ? <Progress value={progress} /> : <></>}
        </div>
    )
}
