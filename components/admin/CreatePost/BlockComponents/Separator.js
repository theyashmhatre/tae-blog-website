import React, { useContext } from 'react'
import { Box, Divider, IconButton, useColorModeValue } from "@chakra-ui/react"
import BlockContext from '../../../../context/BlockContext';
import RemoveComponent from '../RemoveComponent';

export default function Separator(props) {
    const { blocks, setBlocks } = useContext(BlockContext);

    return (
        <Box borderRadius="5px" backgroundColor={useColorModeValue("#FFFFFF", "blackAlpha.500")} border={useColorModeValue("1px solid lightblue", "0px")} padding="20px">
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
                index={props.index}
            />
            <Divider orientation="horizontal" />
        </Box>
    )
}
