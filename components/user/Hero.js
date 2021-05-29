import React from 'react'
import Link from "next/link"
import { Box, Button, Flex, Image, Heading, Stack, Text } from "@chakra-ui/react"
import styles from "./SingleBlogComponents/styles/Hero.module.css";

export default function Hero({
    title,
    subtitle,
    image,
    ctaText,
}) {
    return (
        <>
            <Box className={styles.bgImage} ></Box>
            <Box className={styles.bgText} width={["90%", "80%", "70%"]}>
                <Stack
                    spacing={4}
                    // w={{ base: "80%", md: "100%" }}
                    
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
                    <Button
                        variantColor="primary"
                        borderRadius="8px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="md"
                    >
                        {ctaText}
                    </Button>
                    
                </Stack>
                

            </Box>
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
        </>
    )
}
