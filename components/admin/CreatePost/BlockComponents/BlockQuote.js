import { IconButton, Input } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import BlockContext from "../../../../context/BlockContext"
import RemoveComponent from '../RemoveComponent';

export default function BlockQuote(props) {
    const [quoteValue, setQuoteValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);


    // changes the "value" as the user input changes
    function handleChange(event) {
        const value = event.target.value;
        setQuoteValue({
            ...quoteValue,
            [event.target.name]: value
        });
    }

    // once this input element is out of focus, it adds the final value as the value of the block
    function onBlur(e) {
        props.block.value = Object.values(quoteValue)[0];
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
    }


    return (
        <div>
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
            />

            <Input variant="filled" placeholder="Write quote..." onChange={handleChange} defaultValue={props.block.value} onBlur={onBlur} />
        </div>
    )
}
