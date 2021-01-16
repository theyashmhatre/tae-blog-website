import { Box, HStack, Stack, Text, IconButton, Divider, Container } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'
import { FaWordpressSimple, FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export default function Footer() {
    return (
        <Box marginTop="50px" bgColor="gray.900">
            <Stack spacing={5} margin="auto" w={["90%", "80%", "80%", "75%"]}>
                <Divider />
                <HStack spacing={8} justify="center">
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<GrInstagram size="22px" />}
                        isRound={true}
                    />
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<FaWordpressSimple size="22px" />}
                        isRound={true}
                    />
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<FaTwitter size="22px" />}
                        isRound={true}
                    />
                </HStack>
                <HStack spacing={8} justify="center" color="white">
                    <Link href="/"><a className="link-redirect">Home</a></Link>
                    <Divider orientation="vertical" height="20px" colorScheme="green.500" />
                    <Link href="/"><a className="link-redirect">About</a></Link>
                    <Divider orientation="vertical" height="20px" colorScheme="green.500"/>
                    <Link href="/blogs"><a className="link-redirect">Blogs</a></Link>
                </HStack>
                <div></div>
            </Stack>

            <Box textAlign="center" padding="22px 0px" bgColor="green.500">
                <Text fontSize={["15px","17px","18px"]}>©2021 Designed and built by Yash Mhatre ⚡</Text>
            </Box>
        </Box>
    )
}
