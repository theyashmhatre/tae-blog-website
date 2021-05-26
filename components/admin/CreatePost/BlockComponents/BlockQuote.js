import { Box, IconButton, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from "../../../../context/BlockContext"
import RemoveComponent from '../RemoveComponent';
import { handleChange } from "./utils/utils";

export default function BlockQuote(props) {
    const [quoteValue, setQuoteValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);


    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(quoteValue)[0];
        if (props.block.value) {
            localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
        }
    }


    return (
        <Box borderRadius="5px" backgroundColor={useColorModeValue("#FFFFFF", "blackAlpha.500")} border={useColorModeValue("1px solid lightblue", "0px")} padding="20px">
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
                index={props.index}
            />

            <Input variant="filled" placeholder="Write quote..."
                backgroundColor={useColorModeValue("#F5F5F5", "#3F3F3F")}
                color={useColorModeValue("black", "white")}
                onChange={(e) => { handleChange(e, quoteValue, setQuoteValue) }}
                defaultValue={props.block.value} onBlur={onBlur}

            />
        </Box>
    )
}
