import { Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import BlockContext from '../../../../context/BlockContext';

export default function Description() {
    let [descValue, setDescValue] = useState('');
    const { blocks, setBlocks } = useContext(BlockContext);

    const defaultValue = blocks[0].blogDescription ? blocks[0].blogDescription : "";

    function handleChange(event) {
        const value = event.target.value;
        setDescValue({
            ...descValue,
            [event.target.name]: value
        });
    }

    function onBlur(e) {
        const description = Object.values(descValue)[0];
        blocks[0].blogDescription = description;
        if (description) {
            localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
        }
    }

    return (
        <div>
            <Text mb="8px">Description:</Text>
            <Textarea
                onChange={handleChange}
                placeholder="Write your blog description..."
                size="sm"
                onBlur={onBlur}
                defaultValue={defaultValue}
                maxLength="250"
            />
        </div>
    )
}
