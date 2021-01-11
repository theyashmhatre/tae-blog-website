import React, { useContext, useEffect, useRef, useState } from 'react'
import { Heading, Textarea, IconButton } from "@chakra-ui/react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import BlockContext from "../../../../context/BlockContext"
import { AiOutlineClose } from 'react-icons/ai';
import { RiCloseCircleFill } from 'react-icons/ri';
import RemoveComponent from '../RemoveComponent';

//This component will be dynamically added to the CreatePost Stack when h1 is clicked in the Modal
export default function BlockPara(props) {
    const [paraValue, setParaValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);
    

    // changes the "value" as the user input changes
    function handleChange(event) {
        const value = event.target.value;
        setParaValue({
            ...paraValue,
            [event.target.name]: value
        });
    }

    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(paraValue)[0];
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
    }

    return (
        <>
            {/* Close Button */}
            <RemoveComponent 
                uid = {props.block._uid}
            />

            {/* Input Component */}
            <Textarea
                placeholder="Start writing..."
                size="sm"
                resize="vertical"
                onBlur={onBlur}
                onChange={handleChange}
                defaultValue={props.block.value}
            />
        </>
    )
}
