import { Button, HStack, Icon, IconButton, Spacer, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri';
import BlockContext from '../../../context/BlockContext';
import { CgArrowUpO, CgArrowDownO } from "react-icons/cg";
import { swapElement } from "./BlockComponents/utils/utils";
import { AiOutlineCloudUpload } from 'react-icons/ai';

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
            <HStack marginBottom="10px">
                <Icon color={props.index > 1 ? useColorModeValue("#1A202C","white"): "gray"} as={CgArrowUpO} w={6} h={6} cursor="pointer" onClick={() => { swapElement(props.index, setBlocks, "up") }}></Icon>
                <Icon color={blocks.length > props.index + 1 ? useColorModeValue("#1A202C", "white") : "gray"} as={CgArrowDownO} w={6} h={6} cursor="pointer" onClick={() => { swapElement(props.index, setBlocks, "down") }}></Icon>
                <Spacer />
                <RiCloseCircleFill onClick={removeBlock} cursor="pointer" aria-label="Remove Block" bgColor={closeButtonValue} size="25px" color={closeIconValue} />
            </HStack>


        </div>
    )
}
