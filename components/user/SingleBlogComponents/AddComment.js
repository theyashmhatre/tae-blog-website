import React, { useState } from 'react'
import { Stack, Input, FormControl, FormLabel, FormHelperText, Button, Container } from "@chakra-ui/react"
import axios from 'axios';
import { useDisclosure, useColorMode, useToast } from '@chakra-ui/react'


export default function AddComment({blogId, fetchComments}) {

    const toast = useToast();  //chakra UI method
    const [commentValue, setCommentValue] = useState({
        name: "",
        content: ""
    });

    function handleChange(event) {
        const value = event.target.value;
        setCommentValue({
            ...commentValue,
            [event.target.name]: value
        });
    }

    const onSubmit =  async (e) => {
        e.preventDefault();

        const newComment = {
            name: commentValue.name,
            content: commentValue.content,
            blogId: blogId,
            commentedAt: new Date().valueOf(),
        };

        try {
            await axios.post("/api/client/blog/comments/postComment", newComment);
            toast({
                title: "Thanks for the comment! 😄",
                description: "It'll surely help get this blog better.",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: 'bottom-right'
            });

            fetchComments();
        } catch (err) {

            const errors = err.response.data.errors;

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
        }
        const form = document.querySelector('form');
        form.reset();
        setCommentValue({
            name:"",
            content:""
        });
    };

    return (
        <div>
            <Stack spacing={3} spacing={8} w={["90%", "80%", "70%", "60%"]}  padding="0px 10px 0px 5px" style={{ margin: "auto" }}>
                <form onSubmit={onSubmit}>
                    <FormControl id="name" isRequired marginBottom="15px">
                        <FormLabel>Name</FormLabel>
                        <Input type="name" name="name" onChange={handleChange} />
                    </FormControl>

                    {/* <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" onChange={handleChange} />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl> */}

                    <FormControl id="content" isRequired marginBottom="15px">
                        <FormLabel>Comment</FormLabel>
                        <Input type="content" name="content" onChange={handleChange} />
                    </FormControl>

                    <Container centerContent={true}>
                        <Button colorScheme="blue" type="submit" >
                            Post Comment
                    </Button>
                    </Container>
                </form>
            </Stack>
        </div>
    )
}
