import React, { useContext, useEffect, useState } from 'react'
import { Heading, Input, Tag, TagLabel, TagRightIcon, Text, Textarea } from "@chakra-ui/react"
import BlockContext from '../../../../context/BlockContext';
import styles from "./styles/Tags.module.css";
import { RiCloseCircleFill } from 'react-icons/ri';

export default function Tags() {
    const { blocks, setBlocks } = useContext(BlockContext);

    let [tagValue, setTagValue] = useState('');
    const [tags, setTags] = useState(blocks[0].tags);

    useEffect(() => {
        blocks[0].tags = tags;
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
    }, [tags]);

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        blocks[0].tags = tags;
        setBlocks(blocks);
        localStorage.setItem('componentList', JSON.stringify(blocks)); //saves the updated list in localStorage
    };
    
    const addTags = event => {
        const value = event.target.value;

        if (value !== "") {
            setTags(prevTags => [...prevTags, value]);
            event.target.value = "";
        }
    };


    return (
        <div className={styles.tag_input}>
            <Text fontWeight="bold" letterSpacing="1px" marginBottom="5px">Tags:</Text>
            <ul id={styles.tags}>
                {tags && tags.map((tag, index) => (

                    <Tag size="md" key={index} variant="subtle" colorScheme="cyan" marginRight="5px" marginBottom="5px">
                        <TagLabel>{tag}</TagLabel>
                        <TagRightIcon boxSize="12px" as={RiCloseCircleFill} cursor="pointer" onClick={() => removeTags(index)} />
                    </Tag>
                ))}
            </ul>
            <Input
                type="text"
                display="flex"
                outline="transparent"
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                placeholder="Press enter to add tags"
                marginBottom="20px"
            />
        </div>
    )
}
