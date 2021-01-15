import React from 'react'
import { Box, Heading, HStack, Image, Spacer, Text } from "@chakra-ui/react"
import styles from "../../styles/Blogs.module.css"
import Link from 'next/link';

export default function BlogCard({blog}) {
    let blocks = blog.blocks;
    let date = new Date(blog.uploadedAt).toDateString();
    return (
        <div>
            <Box className={styles.container} rounded="7px" shadow="1xl" height="400px" width="100%">
                <div >
                    <Image height="400px" width="100%" className={styles.bgImage} src= {blog.blocks[0].coverImageUrl}/>
                    
                    <Link href={`/blogs/${encodeURIComponent(blog.blogId)}`}>
                        <Box className={styles.bgText} w={["90%","85%","80%"]}>
                            <Heading fontSize={["30px","40px","50px","55px"]}>{blocks[0].value}</Heading>
                            <HStack paddingTop="10px">
                                <Text fontSize={["15px"]}>~ by {blog.postedBy}</Text>
                                <Spacer />
                                <Text fontSize={["15px"]}>~ {date}</Text>
                            </HStack>

                        </Box>
                    </Link>
                    
                   
                    <Text className={styles.bottomRight}>views: {blog.views}</Text>
                </div>
            </Box>
        </div>
    )
}
