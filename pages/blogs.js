import Head from 'next/head'
import React from 'react'
import Header from '../components/user/Layout/Header'

export default function Blogs() {
    return (
        <div>
            <Head>
                <title>Blogs</title>
            </Head>
            <Header />
            <h1>
                Blogs
            </h1>
        </div>
    )
}
