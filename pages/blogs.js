import { Heading, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import BlogCard from '../components/user/BlogCard'
import Header from '../components/user/Layout/Header'
import { db } from "../config/config"

export default function Blogs({ blogs }) {
    return (
        <div>
            <Head>
                <title>Blogs - The Adventurous Engineer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

            </Head>
            <Header />

            <Stack spacing={8} w={["95%", "90%", "85%", "75%"]} style={{ margin: "auto" }}>
                <Heading textAlign="center">
                    Blog Feed
                </Heading>
                {blogs.map((blog) => {
                    {/* let name = blog.blocks[0].value.trim().replace(/\s+/g, '-'); */ }
                    return <div key={blog.blogId}>
                        <BlogCard
                            blog={blog}
                        />
                    </div>
                })}
            </Stack>
        </div>
    )
}

export async function getStaticProps(context) {
    const host = process.env.NODE_ENV === "production" ? "https://the-adventurous-engineer.vercel.app" : "http://localhost:3000"; 
    const blogsList = await axios.get(host+"/api/client/blog/getAllBlogs");

    let blogs = JSON.parse(JSON.stringify(blogsList.data));
    return {
        props: {
            blogs,
        },
    }
}
