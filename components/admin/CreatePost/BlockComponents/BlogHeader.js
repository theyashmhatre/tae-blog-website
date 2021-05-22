import { Heading, Input, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from "../../../../context/BlockContext"
import {handleChange} from "../BlockComponents/utils/utils";

export default function BlogHeader(props) {

    const [headValue, setHeadValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);


    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(headValue)[0];
        if (props.block.value) {
            localStorage.setItem('componentList', JSON.stringify(blocks));
        }
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <Textarea
                placeholder="Blog Title"
                size="lg" onBlur={onBlur}
                onChange={(e) => {handleChange(e, headValue, setHeadValue)}}
                variant="flushed"
                defaultValue={props.block.value}
                isRequired={true}
                fontSize={["22px", "30px", "40px"]}
                fontWeight="bold"
                padding="50px 0px"
                textAlign="center"
                overflowWrap="break-word"
                overflow="hidden"
                size="700px"
            />
        </div>
    )
}
