import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export default function BlogTitle(props) {
    return (
        <Box textAlign="center">
            <Heading fontSize={["25px","40px","50px"]}>
                {props.block.value}
            </Heading>
        </Box>
    )
}
