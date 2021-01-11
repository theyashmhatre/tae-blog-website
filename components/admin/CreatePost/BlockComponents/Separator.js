import React, { useContext } from 'react'
import { Divider, IconButton } from "@chakra-ui/react"
import BlockContext from '../../../../context/BlockContext';
import RemoveComponent from '../RemoveComponent';

export default function Separator(props) {
    const { blocks, setBlocks } = useContext(BlockContext);

    return (
        <div>
            {/* Close Button */}
            <RemoveComponent
                uid={props.block._uid}
            />
            <Divider orientation="horizontal" />
        </div>
    )
}
