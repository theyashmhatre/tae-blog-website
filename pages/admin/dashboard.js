import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from "../../lib/auth";

export default function AdminDashboard() {
    const router = useRouter();
    const auth = useAuth();

    const { user, loading } = useAuth();

    if (!loading && !user) {
        router.push('/admin/login');
    }

    return (
        <div>
            <Head>
                <title>
                    Dashboard - The Adventurous Engineer
                </title>
            </Head>
            <Heading>
                AdminDashboard
            </Heading>

            <Button onClick={() => auth.signout()}>
                Sign out
            </Button>
        </div>


    )
}
