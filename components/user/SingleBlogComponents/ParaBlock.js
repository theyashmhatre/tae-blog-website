import { Text } from '@chakra-ui/react'
import React from 'react'

export default function ParaBlock(props) {
    return (
        <div>
            <Text fontSize={["17px","19px","21px"]} align="justify">
                {props.block.value}
            </Text>            
        </div>
    )
}
