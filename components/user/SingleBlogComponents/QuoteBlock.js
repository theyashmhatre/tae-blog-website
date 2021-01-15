import { Box, Container, Divider } from '@chakra-ui/react'
import React from 'react'

export default function QuoteBlock(props) {
    return (
        <Box fontSize={["18px","25px"]}>
            <Container centerContent="true">
                <Divider width="50%" size="10px" variant="dashed"/>
                <blockquote style={{ textAlign: "center",padding:"20px" }}>
                    {props.block.value}
                </blockquote>
                <Divider width="50%" size="10px" variant="dashed" />
            </Container>
        </Box>
    )
}
