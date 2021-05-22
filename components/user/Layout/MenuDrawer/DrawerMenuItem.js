import { HStack } from '@chakra-ui/layout'
import React from 'react'
import Link from "next/link";

export default function DrawerMenuItem({name,icon, link}) {
    return (
        <div>
            <HStack marginTop="10px" padding="10px 5px" fontSize="25px" spacing={6} _hover={{ border: "1px solid white" }} borderRadius="10px">
                {icon}
                <Link href={link}>{name}</Link>
            </HStack>
        </div>
    )
}
