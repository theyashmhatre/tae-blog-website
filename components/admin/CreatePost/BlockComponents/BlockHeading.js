import React, { useContext, useState } from 'react'
import { Box, Heading, IconButton, Input, useColorModeValue } from "@chakra-ui/react"
import BlockContext from "../../../../context/BlockContext"
import RemoveComponent from '../RemoveComponent';
import { handleChange } from "./utils/utils";

//This component will be dynamically added to the CreatePost Stack when Heading is clicked in the Modal
export default function BlockHeading(props) {

    const [headValue, setHeadValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);

    // changes the "value" as the user input changes
    // function handleChange(event) {
    //     const value = event.target.value;
    //     setHeadValue({
    //         ...headValue,
    //         [event.target.name]: value,
    //     });
    // }

    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(headValue)[0];
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

            {/* Input Component */}
            <Input
                fontWeight="600"
                backgroundColor={useColorModeValue("#F5F5F5", "#3F3F3F")}
                color={useColorModeValue("black", "white")}
                textAlign="center"
                border="0px solid black"
                placeholder="Type your heading"
                size="lg" onBlur={onBlur}
                onChange={(e) => { handleChange(e, headValue, setHeadValue) }}
                defaultValue={props.block.value}  //after a page refresh, the input will have the previous value inside it
            />
        </Box>
    )
}
