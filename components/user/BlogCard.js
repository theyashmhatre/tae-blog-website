import React, { useEffect, useRef } from 'react'
import { Avatar, Badge, Box, Divider, Heading, HStack, Image, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import styles from "../../styles/Blogs.module.css"
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { AiOutlineHeart} from "react-icons/ai";
import { GoComment} from "react-icons/go";
import {BsEye} from "react-icons/bs";

export default function BlogCard({ blog }) {
    let blocks = blog.blocks;
    let date = new Date(blog.uploadedAt).toDateString();
    let styledDate = date.slice(3, 10) + "," + date.slice(10, 15);
    let value = blocks[0].value;
    let blogName = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');


    return (
        <Box padding="10px" >
            {/* <Box className={styles.container} rounded="7px" shadow="1xl" height={["300px", "400px"]} width="100%" overflow="hidden" >
                <div >
                    <Image height={["300px", "400px"]} width="100%" className={styles.bgImage} src={blog.blocks[0].coverImageUrl} />

                    <Link href={`/blogs/[id]/[page_name]/`} as={`/blogs/${blog.blogId}/${encodeURIComponent(blogName)}/`}>
                        <Box className={styles.bgText} w={["90%", "85%", "80%"]}>
                            <Heading fontSize={["20px", "30px", "40px", "40px"]}>{blocks[0].value}</Heading>
                            <HStack paddingTop="10px">
                                <Text fontSize={["15px"]}>~ by {blog.postedBy}</Text>
                                <Spacer />
                                <Text fontSize={["15px"]}>~ {date}</Text>
                            </HStack>

                        </Box>
                    </Link>


                    <Text className={styles.bottomRight}>views: {blog.views}</Text>
                </div>
            </Box> */}


            <Fade big>
                <Link href={`/blogs/[id]/[page_name]/`} as={`/blogs/${blog.blogId}/${encodeURIComponent(blogName)}/`}>
                    <Box maxW="3xl" backgroundColor={useColorModeValue("#F5F5F5", "blackAlpha.700")} borderRadius="lg" margin="auto" overflow="hidden" boxShadow= "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
                        <Image src={blog.blocks[0].coverImageUrl} _hover={{opacity:"0.7"}} transition="0.3s" cursor="pointer" boxSize="50vh" width="100%" objectFit="cover" alt="{property.imageAlt}" />

                        <Box p="6">

                            <Box _hover={{color:"lightblue"}} transition="ease 0.5s" cursor="pointer">
                            <Box d="flex" mb="10px">
                                <Avatar name={blog.postedBy} src="https://bit.ly/tioluwani-kolawole" mr={["10px", "20px"]} />
                                <Box>
                                    <Text fontWeight="medium">{blog.postedBy}</Text>
                                    <Text>{styledDate} &bull; 1 day ago</Text>
                                </Box>
                            </Box>

                                <Stack>
                                    <Text
                                        mt="1"
                                        fontWeight="semibold"
                                        fontSize={["22px", "25px", "28px"]}

                                    >
                                        {blocks[0].value}
                                    </Text>
                                    <Text isTruncated>{blog.blocks[0].blogDescription}</Text>
                                </Stack>

                                <Divider mt="20px" mb="10px" /></Box>

                            

                            <HStack>
                                <BsEye />
                                <Text>{blog.views}</Text>
                                <GoComment />
                                <Text>3</Text>
                                <Spacer />
                                <AiOutlineHeart color="red" />
                                <Text>8</Text>
                            </HStack>
                        </Box>
                    </Box>
                </Link>
            </Fade>
        </Box>
    )
}
