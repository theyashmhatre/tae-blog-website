import React from 'react'
import Head from 'next/head';
import { Heading, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import {useAuth} from "../../lib/auth";

export default function Login() {
    const auth = useAuth();
    console.log(auth);

    return (
        <div>
            <Head>
                <title>
                    Sign In
                </title>
            </Head>
            <Heading margin="auto" width="10rem">
                SignIn
            </Heading>

            <Box margin="auto" width="10rem" marginTop="50px">
                <Button margin="auto" onClick={() => { auth.signinWithGoogle('/admin/dashboard/')}}>
                    Google Sign-up
                </Button>
            </Box>
        </div>
    )
}
