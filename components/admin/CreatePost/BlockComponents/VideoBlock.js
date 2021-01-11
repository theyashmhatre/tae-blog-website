import { AspectRatio, Box, Button, Center, Container, Editable, EditableInput, EditablePreview, IconButton, Progress, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RiCloseCircleFill } from 'react-icons/ri';
import BlockContext from '../../../../context/BlockContext';
import { storage } from "../../../../config/config"

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
            setVideo({
                preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
                raw: e.target.files[0],
                visible: true,
                uploaded: false,
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
        props.block.videoDesc = Object.values(desc)[0];
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage 
    }

    //uploads the image on firebase in the directory images/ after the user clicks on upload
    const handleUpload = async e => {
        e.preventDefault();

        if (!video.raw) {  // if user hasn't loaded any input image, it'll display an error toast
            toast({
                title: "No file chosen",
                description: "Please upload a video and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
        setShowProgressBar(true);

        const uploadTask = storage.ref(`${blocks[0]._uid}` + "/videos/" + `${video.raw.name}`).put(video.raw);
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
                    .child(video.raw.name)
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
            {/* CLose Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <IconButton onClick={removeBlock} bgColor={closeButtonValue} aria-label="Remove Block" icon={<RiCloseCircleFill size="25px" color={closeIconValue} />} />
            </div>

            {video.uploaded || props.block.videoUploaded ? <></> :
                <label htmlFor="upload-button">
                    <Box w={["100%", "50%", "50%"]} color="white" bgColor="gray.800" border="1px solid black" borderRadius="5px" padding="5px 5px" margin="auto">
                        <input type="file" onChange={handleChange} />
                    </Box>
                </label>}

            {/* hides the Upload button once the upload is complete i.e. Progress reaches 100 or imageUploaded=true */}
            {progress === 100 || props.block.videoUploaded ?
                <></> :
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                    <Button leftIcon={<AiOutlineCloudUpload size="20px" />} onClick={handleUpload} variant="solid" colorScheme="green">Upload</Button>
                </div>
            }

            <div>
                <Container>
                    {video.uploaded || props.block.videoUploaded ?
                        <iframe
                            frameBorder='0'
                            width={["100%", "90%"]}
                            height={["300px", "400px"]}
                            title={props.block.videoDesc}
                            src={props.block.url}
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
