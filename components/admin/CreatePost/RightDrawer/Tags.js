import React, { useContext, useState } from 'react'
import { Text, Textarea } from "@chakra-ui/react"
import BlockContext from '../../../../context/BlockContext';

export default function Tags() {

    let [tagValue, setTagValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);

    const defaultValue = blocks[0].tags ? blocks[0].tags.join(";") : '';

    function handleChange(event) {
        const value = event.target.value;
        setTagValue({
            ...tagValue,
            [event.target.name]: value
        });
        console.log(tagValue);
    }

    function onBlur(e) {
        const tags = Object.values(tagValue)[0];
        const tagList = tags.split(";");
        console.log(tags,tagList);
        blocks[0].tags = tagList;
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
    }

    return (
        <div>
            <Text mb="8px">Tags:</Text>
            <Textarea
                onChange={handleChange}
                placeholder="Separate each tag with a semicolon(;)"
                size="sm"
                onBlur={onBlur}
                defaultValue={defaultValue}
            />
        </div>
    )
}
