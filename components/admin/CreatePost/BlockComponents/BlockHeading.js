import React, { useContext, useState } from 'react'
import { Heading, IconButton, Input } from "@chakra-ui/react"
import BlockContext from "../../../../context/BlockContext"
import RemoveComponent from '../RemoveComponent';

//This component will be dynamically added to the CreatePost Stack when Heading is clicked in the Modal
export default function BlockHeading(props) {

    const [headValue, setHeadValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);

    // changes the "value" as the user input changes
    function handleChange(event) {
        const value = event.target.value;
        setHeadValue({
            ...headValue,
            [event.target.name]: value,
        });
    }

    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(headValue)[0];
        if(props.block.value) {
            localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
        }
    }

    return (
        <div>
        
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
            />

            {/* Input Component */}
            <Input
            fontWeight="600"
            textAlign="center"
                placeholder="Type your heading"
                size="lg" onBlur={onBlur}
                onChange={handleChange}
                defaultValue={props.block.value}  //after a page refresh, the input will have the previous value inside it
            />
        </div>
    )
}
