import React, { useEffect, useState } from 'react'
import {Avatar, Box, Heading, Stack, Text, VStack, HStack, Spacer, Container, useColorModeValue} from "@chakra-ui/react"
import axios from 'axios';
import AddComment from './AddComment';

export default function Comments({blogId, blogName}) {

    const [ comments, setComments] = useState([]);
    const value = useColorModeValue("gray.400", "gray.700");

    const fetchComments = async () => {
        await axios.post("/api/client/blog/comments/getComments", { blogId: blogId })
            .then((res) => {
                setComments(res.data.commentList);
            })
            .catch((err) => {
                console.log(err);
                throw new Error(err);
            });
    };

    useEffect(() => {

        fetchComments();   

    }, [comments.length]);

    return (
        <Box w={["100%", "85%", "80%", "75%"]} padding="30px 0px 30px 0px" style={{ margin: "auto" }}>
            <Heading as="h3" textAlign="center">{comments? comments.length: 0} Comments on {blogName}</Heading>

            <Container centerContent="true" >
                <Stack paddingBottom="50px">
                    {comments ? comments.map((comment, i) => {
                        let date = new Date(comment.commentedAt).toDateString()
                        let finalDate = date.slice(0,2) + "," +date.slice(2);
                        return (
                            <Box border="1px solid white" padding="15px" key={i} width="100%" borderRadius="5px" bgColor={value} margin="20px 0px 10px 0px" >
                                <HStack marginBottom="20px">
                                    <Avatar name={comment.name} size="lg" src="https://bit.ly/tioluwani-kolawole" />

                                    <Text fontWeight="900">{comment.name}  • </Text>
                                    <Text>{finalDate}</Text>

                                </HStack>
                                <Text>
                                    {comment.content}
                                </Text>

                            </Box>
                        );
                    }) : <></>}
                </Stack>
            
            </Container>
            <AddComment
                blogId= {blogId}
                fetchComments = {fetchComments}
            />
        </Box>
    )
}
