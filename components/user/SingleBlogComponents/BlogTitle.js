import { Box, Flex, Heading, Stack, Tag, TagLabel } from '@chakra-ui/react'
import Head from 'next/head';
import React from 'react'
import BlogTags from './BlogTags';
import styles from './styles/BlogTitle.module.css';

export default function BlogTitle(props) {
    var blogTags = props.block.tags.slice(0,3);
    return (
        <>
            <Flex
                align="center"
                justify={{ base: "center", md: "space-around", xl: "space-between" }}
                direction={{ base: "column-reverse", md: "row" }}
                wrap="no-wrap"
                minH="100vh"
                // px={8}
                // pb={16}
                mb="20px"
                backgroundImage={`url(${props.block.coverImageUrl})`}
                backgroundSize="cover"
                position="relative"
                backgroundRepeat="no-repeat"
                bgAttachment="fixed"
            >
                <Stack spacing={4} w={["90%", "80%", "70%"]} margin="auto" align={["center"]}>

                    <ul style={{ listStyle: "none", textAlign: "center" }}>
                        {blogTags ? blogTags.map((tag, index) => (

                            <li style={{ display: "inline-block", marginBottom: "10px" }} key={index}>
                                <Box style={{ marginRight: "10px", marginBottom: "200px", display: "inline" }}>
                                    <Tag size={["lg"]} key={tag} fontSize={["13px", "16px"]} variant="outline" color="white" colorScheme="blackAlpha" >
                                        <TagLabel>
                                            {tag}
                                        </TagLabel>
                                    </Tag>
                                </Box>
                            </li>
                        )) : <></>}
                    </ul>

                    <Heading as="h1" fontSize={["30px", "40px", "50px"]} textAlign="center">
                        {props.block.value}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="primary.800"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                    >
                        Written by {props.postedBy}
                    </Heading>
                </Stack>

            </Flex>
        </>
    )
}
