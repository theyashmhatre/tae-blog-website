import { Button } from '@chakra-ui/button'
import { Box, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import React from 'react'

export default function signup() {
    return (
        <div>
            <Head>
                <title>
                    Sign Up
                </title>
            </Head>
            <Heading margin="auto" width="10rem">
                SignUp
            </Heading>

            <Box margin="auto" width="10rem" marginTop="50px">
                <Button margin="auto">
                    Google Sign-up
                </Button>
            </Box>
        </div>
    )
}
