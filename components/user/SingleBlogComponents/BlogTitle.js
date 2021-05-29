import { Box, Heading, Stack, Tag, TagLabel } from '@chakra-ui/react'
import Head from 'next/head';
import React from 'react'
import BlogTags from './BlogTags';
import styles from './styles/BlogTitle.module.css';

export default function BlogTitle(props) {
    var blogTags = props.block.tags.slice(0,3);
    return (
        <>
            <Box className={styles.bgBlogImage} marginBottom="50px" backgroundImage={`url(${props.block.coverImageUrl})`} ></Box>
            <Box className={styles.bgBlogText} width={["90%", "70%"]} >
                <Stack spacing={4} align={["center", "center"]}>

                    <ul style={{ listStyle: "none", textAlign: "center" }}>
                        {blogTags ? blogTags.map((tag, index) => (

                            <li style={{ display: "inline-block", marginBottom: "10px" }} key={index}>
                                <Box style={{ marginRight: "10px", marginBottom: "200px", display: "inline" }}>
                                    <Tag size={["lg"]} key={tag} fontSize={["13px", "16px"]} variant="outline" colorScheme="blackAlpha" >
                                        <TagLabel>
                                            {tag}
                                        </TagLabel>
                                    </Tag>
                                </Box>
                            </li>
                        )) : <></>}
                    </ul>

                    <Heading as="h1" fontSize={["30px", "40px", "50px"]}>
                        {props.block.value}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="primary.800"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}
                    >
                        Written by {props.postedBy}
                    </Heading>
                </Stack>
            </Box>
        </>
    )
}
