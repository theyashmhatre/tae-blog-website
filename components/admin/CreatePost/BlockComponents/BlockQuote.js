import { IconButton, Input } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from "../../../../context/BlockContext"
import RemoveComponent from '../RemoveComponent';
import {handleChange} from "./utils/utils";

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
        <div>
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
                index={props.index}
            />

            <Input variant="filled" placeholder="Write quote..." onChange={(e) => {handleChange(e, quoteValue, setQuoteValue)}} defaultValue={props.block.value} onBlur={onBlur} />
        </div>
    )
}
