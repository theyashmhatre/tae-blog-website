import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export default function BlogTitle(props) {
    return (
        <Box textAlign="center">
            <Heading as="h1" fontSize={["30px","40px","50px"]}>
                {props.block.value}
            </Heading>
        </Box>
    )
}
