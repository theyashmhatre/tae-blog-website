import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

export default function VideoBlock(props) {
    return (
        <div>
            <Box width="100%">
                <Container maxW="2xl" size={["100%", "100%"]} centerContent="true">
                    <iframe
                        frameBorder='0'
                        width={["100%", "90%"]}
                        height={["300px", "400px"]}
                        title={props.block.videoDesc}
                        src={props.block.url}
                        allowFullScreen
                    />
                    <Text padding="7px" fontSize={["15px", "20px"]} fontStyle="italic">{props.block.videoDesc}</Text>
                </Container>
            </Box>
        </div>
    )
}
