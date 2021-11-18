import React, { useEffect, useRef } from 'react'
import { Avatar, Badge, Box, Button, Divider, Heading, HStack, Image, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BsEye } from "react-icons/bs";
import styled from "styled-components";

const Section = styled.section`
    width: 100%;
    height: 100%;
    padding: 4rem 0rem;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 600px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 300px;
    }`;

const ColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${({ index }) => (index % 2 == 0 ? 'flex-end' : 'flex-start')};
    line-height: 1.4;
    padding: 1rem 2rem;
    order: ${({ index }) => (index % 2 == 0 ? '2' : '1')};
    word-wrap: break-word;

    @media screen and (max-width: 768px) {
        align-items: 'flex-start'
    }

    h1 {
        margin-bottom: 1rem;
        font-size: clamp(1.5rem, 6vw, 2rem);
    }

    p{
        margin-bottom: 2rem;
        word-wrap: break-word;
    }
`;
const ColumnRight = styled.div`
    padding: 1rem 2rem;
    order: ${({ index }) => (index % 2 == 0 ? '1' : '2')};
    display:flex;
    justify-content: center;
    align-items: center;
    

    @media screen and (max-width: 768px) {
        order: ${({ index }) => (index % 2 == 0 ? '2' : '1')};
        align-items: 'flex-start'
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5%;

        @media screen and (max-width: 768px){
            width: 90%;
            height: 90%;
        }
    }
`;

export default function BlogCard({ blog, index }) {
    let blocks = blog.blocks;
    let date = new Date(blog.uploadedAt).toDateString();
    let styledDate = date.slice(3, 10) + "," + date.slice(10, 15);
    let value = blocks[0].value;
    let blogName = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');



    return (
        <Fade big>
            <Section>
                <Container>
                    <ColumnRight index={index}>
                        <Fade big>
                            <img src={blog.blocks[0].coverImageUrl} />
                        </Fade>
                        {/* <Image src={blog.blocks[0].coverImageUrl} _hover={{ opacity: "0.7" }} transition="0.3s" cursor="pointer" boxSize="50vh" width="100%" objectFit="cover" alt="{property.imageAlt}" /> */}
                    </ColumnRight>
                    <ColumnLeft index={index}>
                        <Fade big>
                            <h1>{blocks[0].value}</h1>
                            <p>{blog.blocks[0].blogDescription}</p>
                            <Link href={`/blogs/[id]/[page_name]/`} as={`/blogs/${blog.blogId}/${encodeURIComponent(blogName)}/`}>
                                <Button>Read more...</Button>
                            </Link>
                        </Fade>
                    </ColumnLeft>

                </Container>
            </Section>
        </Fade>

    )
}


{/* <Fade big>
    <Link href={`/blogs/[id]/[page_name]/`} as={`/blogs/${blog.blogId}/${encodeURIComponent(blogName)}/`}>
        <Box maxW="3xl" backgroundColor={useColorModeValue("#F5F5F5", "blackAlpha.700")} borderRadius="lg" margin="auto" overflow="hidden" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
            <Image src={blog.blocks[0].coverImageUrl} _hover={{ opacity: "0.7" }} transition="0.3s" cursor="pointer" boxSize="50vh" width="100%" objectFit="cover" alt="{property.imageAlt}" />

            <Box p="6">

                <Box _hover={{ color: "lightblue" }} transition="ease 0.5s" cursor="pointer">
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
</Fade> */}