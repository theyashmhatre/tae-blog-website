import { Heading, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import BlogCard from '../components/user/BlogCard'
import Header from '../components/user/Layout/Header'
import { db } from "../config/config";
import useSWR from 'swr'; 

const fetcher = async (url) => {
    let blogsList = [];
    await db.collection("blogs")
        .orderBy("uploadedAt", "desc")
        .get()
        .then((data) => {
            data.forEach((doc) => {
                blogsList.push({
                    blogId: doc.id,
                    blocks: doc.data().blocks,
                    likes: doc.data().likes,
                    postedBy: doc.data().postedBy,
                    uploadedAt: doc.data().uploadedAt,
                    views: doc.data().views
                });
            });
        })
        .catch((err) => {
            console.error("Err", err);
        });
    
    return blogsList;
};

export default function Blogs(props) {

    const {data} = useSWR('/api/client/blog/getAllBlogs',fetcher,{initialData: props.blogs});

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
                {data.map((blog) => {
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
    let blogsList = await fetcher("getAllBlogs");

    let blogs = JSON.parse(JSON.stringify(blogsList));
    return {
        props: {
            blogs,
        },
    }
}
