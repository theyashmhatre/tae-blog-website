import { HStack, IconButton, Spacer, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri';
import BlockContext from '../../../context/BlockContext';
import { CgArrowUpO, CgArrowDownO } from "react-icons/cg";
import { swapElement } from "./BlockComponents/utils/utils";

export default function RemoveComponent(props) {
    const { blocks, setBlocks } = useContext(BlockContext);
    const closeButtonValue = useColorModeValue("white", "#1A202C");
    const closeIconValue = useColorModeValue("#1A202C", "white");

    function removeBlock() {
        console.log(props);
        //filters out the selected block from the list
        const newList = blocks.filter((block) => block._uid !== props.uid);
        //when the block is set using setBlocks, it'll automatically update the localstorage as well since we've specified useEffect to update after every change in blocks
        setBlocks(newList);
    }


    return (
        <div>
            {/* Close Button */}
            <HStack>
                <IconButton disabled={props.index > 1 ? false : true} onClick={() => { swapElement(props.index, setBlocks, "up") }} bgColor={closeButtonValue} aria-label="Move Upward" icon={<CgArrowUpO size="25px" color={closeIconValue} />} />
                <IconButton disabled={blocks.length > props.index + 1 ? false : true} onClick={() => { swapElement(props.index, setBlocks, "down") }} bgColor={closeButtonValue} aria-label="Move Downward" icon={<CgArrowDownO size="25px" color={closeIconValue} />} />
                <Spacer />
                <IconButton onClick={removeBlock} aria-label="Remove Block" bgColor={closeButtonValue} icon={<RiCloseCircleFill size="25px" color={closeIconValue} />} />
            </HStack>


        </div>
    )
}
