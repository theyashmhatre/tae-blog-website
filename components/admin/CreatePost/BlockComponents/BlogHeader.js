import { Heading, Input, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from "../../../../context/BlockContext"

export default function BlogHeader(props) {

    const [headValue, setHeadValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);

    // changes the "value" as the user input changes
    function handleChange(event) {
        const value = event.target.value;
        setHeadValue({
            ...headValue,
            [event.target.name]: value
        });
    }

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
                onChange={handleChange}
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
