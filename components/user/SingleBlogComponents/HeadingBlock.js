import { Heading } from '@chakra-ui/react'
import React from 'react'
import {Fonts} from "../../../public/fonts/fonts"

export default function HeadingBlock(props) {
    return (
        <div>
            <Heading fontFamily="Raleway" textAlign="center">
                {props.block.value}
            </Heading>
        </div>
    )
}
