import React from 'react';
import axios from 'axios';
import Header from "../../components/user/Layout/Header"
import Head from 'next/head';
import { Stack } from '@chakra-ui/react';
import Components from '../../components/user/CreateComponents/CreateComponents';
import SeoMeta from '../../components/user/MetaTags/seo-meta';

export default function SinglePost({blog}) {
    let blocks = blog.blocks;

    return (
        <div>
            <SeoMeta 
                title={blocks[0].value}
                coverImageUrl = {blocks[0].coverImageUrl}
                desc = {blocks[0].blogDescription}
            />
            <Header />
            <Stack spacing={8} w={["90%", "80%", "80%", "75%"]} padding="0px 10px 0px 5px" style={{ margin: "auto" }}>
                {blocks.map(block=> Components(block))}
            </Stack>
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get blogs
    const blogsList = await axios.get("http://localhost:3000/api/client/blog/getAllBlogs");

    let blogs = JSON.parse(JSON.stringify(blogsList.data));


    // Get the paths we want to pre-render based on posts
    const paths = blogs.map((blog) => ({
        params: { id: blog.blogId },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}


export async function getStaticProps({params}) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library

    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://the-adventurous-engineer.vercel.app";
    const singleBlog = await axios.get(host+"/api/client/blog/getBlog", {
        params : {
            id : params.id
        }
    });

    let blog = JSON.parse(JSON.stringify(singleBlog.data));

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time

    return {
        props: {
            blog,
        },
    }
}