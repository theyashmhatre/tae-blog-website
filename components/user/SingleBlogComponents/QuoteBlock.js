import { Box, Container, Divider, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import styles from "./styles/QuoteBlock.module.css";

export default function QuoteBlock(props) {

    const quoteBackground = useColorModeValue("#EDEDED", "gray.500");

    return (
        <Box fontSize={["16px","20px", "25px"]}>
            <Container centerContent="true">
                <Divider width="50%" colorScheme="gray.900" size="5px" />
                <Box width={["100%","100%","100%"]}>
                    <blockquote className={styles.blockquote} style={{ background: quoteBackground }}>
                        {props.block.value}
                    </blockquote>
                </Box>

                <Divider width="50%" size="10px" variant="dashed" />
            </Container>
        </Box>
    )
}
