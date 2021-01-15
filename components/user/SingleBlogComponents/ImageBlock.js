import { Box, Container, Image, propNames, Text } from '@chakra-ui/react'
import React from 'react'

export default function ImageBlock(props) {
    return (
        // <Box h={["200px","300px","400px"]}  objectFit="cover">
        //     <Image alt={props.block.imageDesc} height="100%" w={["100%", "100%", "80%"]} margin="auto" src={props.block.url}/>
        //     <Text margin="auto" >{props.block.imageDesc}</Text>
        // </Box>

        <Box width="100%">
            <Container maxW="2xl" size="100%" centerContent="true">
                <Image src={props.block.url} borderRadius="5px" />
                <Text padding="7px"  fontSize={["15px","20px"]} fontStyle="italic">{props.block.imageDesc}</Text>
            </Container>
        </Box>
    )
}
