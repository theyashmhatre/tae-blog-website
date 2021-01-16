import { Box, Container, Image, Skeleton, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ImageBlock(props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        // <Box h={["200px","300px","400px"]}  objectFit="cover">
        //     <Image alt={props.block.imageDesc} height="100%" w={["100%", "100%", "80%"]} margin="auto" src={props.block.url}/>
        //     <Text margin="auto" >{props.block.imageDesc}</Text>
        // </Box>

        <Box width="100%">
            <Container maxW="2xl" size="100%" centerContent="true">

                {imageLoaded ? <></> :
                <div style={{width:"100%"}}>
                        <Skeleton height="300px" width="100%" marginBottom="10px">
                            <div>contents wrapped</div>
                            <div>won't be visible</div>
                        </Skeleton>
                        <Skeleton height="20px" width="100%">
                            <div>won't be visible</div>
                        </Skeleton>
                </div>}
                
                <Image src={props.block.url} borderRadius="5px" onLoad={(() => setImageLoaded(true))} />
                <Text padding="7px" fontSize={["15px", "20px"]} fontStyle="italic">{props.block.imageDesc}</Text>
            </Container>
        </Box>
    )
}
