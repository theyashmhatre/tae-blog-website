import { IconButton, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri';
import BlockContext from '../../../context/BlockContext';

export default function RemoveComponent(props) {
    const { blocks, setBlocks } = useContext(BlockContext);
    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const closeIconValue = useColorModeValue("#1A202C", "white");

    function removeBlock() {
        console.log(props);
        const newList = blocks.filter((block) => block._uid !== props.uid);
        setBlocks(newList);
    }


    return (
        <div>
            {/* Close Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <IconButton onClick={removeBlock} aria-label="Remove Block" bgColor={closeButtonValue} icon={<RiCloseCircleFill size="25px" color={closeIconValue} />} />
            </div>

        </div>
    )
}
