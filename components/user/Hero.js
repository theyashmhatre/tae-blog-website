import React from 'react'
import Link from "next/link"
import { Box, Button, Flex, Image, Heading, Stack, Text } from "@chakra-ui/react"
import styles from "./SingleBlogComponents/styles/Hero.module.css";
import SubscribeForm from './SubscribeForm';

export default function Hero({
    title,
    subtitle,
    image,
    ctaText,
}) {
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="100vh"
            px={8}
            pb={16}
            bgImage="/image2.jpg"
            backgroundSize="cover"
            position="relative"
            backgroundRepeat="no-repeat"
            bgAttachment="fixed"
            backgroundColor="transparent"
        >
            <Stack
                spacing={4}
                w={{ base: "80%", md: "100%" }}
                align={["center", "center"]}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="primary.800"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {title}
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
                    {subtitle}
                </Heading>
                <SubscribeForm />
                <Text
                    fontSize="xs"
                    mt={2}
                    textAlign="center"
                    color="whiteAlpha.700"
                    opacity="0.4"
                    right={2}
                    bottom={2}
                    position="absolute"
                >
                    Photo by <a href="https://unsplash.com/@trip_n_trek_india?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trip & Trek India</a> on <a href="https://unsplash.com/s/photos/travelling?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                </Text>
            </Stack>

        </Flex>
    )
}
