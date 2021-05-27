import { HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import Link from "next/link";
import { color } from '@chakra-ui/styled-system';
import { useRouter } from "next/router";

export default function DrawerMenuItem({ name, icon, link }) {
    const router = useRouter();

    return (
        <>
            <HStack
                backgroundColor={router.pathname === link ? "violet" : ""}
                mb="0px"
                paddingY="10px"
                paddingLeft="30px"
                cursor="pointer"
                fontSize="25px"
                fontWeight="normal"
                spacing={6}
                transition="ease 0.5s"
                _hover={{ backgroundColor: router.pathname === link ? "violet" :"lightgray", color: "blackAlpha.800" }}
            >
                {icon}
                <Text>
                    <Link href={link}>
                        {name}
                    </Link>
                </Text>
            </HStack>
        </>
    )
}
