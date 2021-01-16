import React from 'react';
import axios from 'axios';
import Header from "../../components/user/Layout/Header"
import Head from 'next/head';
import { Stack } from '@chakra-ui/react';
import Components from '../../components/user/CreateComponents/CreateComponents';
import SeoMeta from '../../components/user/MetaTags/seo-meta';
import {db} from "../../config/config"
// import useSWR from 'swr'; 

// const fetcher = async (url) => {
//     let blogsList = [];
//     await db.collection("blogs")
//         .orderBy("uploadedAt", "desc")
//         .get()
//         .then((data) => {
//             data.forEach((doc) => {
//                 blogsList.push({
//                     blogId: doc.id,
//                     blocks: doc.data().blocks,
//                     likes: doc.data().likes,
//                     postedBy: doc.data().postedBy,
//                     uploadedAt: doc.data().uploadedAt,
//                     views: doc.data().views
//                 });
//             });
//         })
//         .catch((err) => {
//             console.error("Err", err);
//         });

//     return blogsList;
// };

// const fetchSingleBlog = async (id) => {
//     let blogData = [];
//     await db.doc(`/blogs/${id}`)
//         .get()
//         .then((doc) => {
//             if (!doc.exists) {
//                 return res.status(404).json({ error: 'Blog not found' });
//             }

//             blogData = doc.data();
//         })
//         .catch((err) => {
//             console.error(err);
//         });

//     return blogData;
// };

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
    
    let blogs = JSON.parse(JSON.stringify(blogsList));


    // Get the paths we want to pre-render based on posts
    const paths = blogs.map((blog) => ({
        params: { id: blog.blogId },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true, }
}


export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    let blogData = [];

    await db.doc(`/blogs/${params.id}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Blog not found' });
            }

            blogData = doc.data();
        })
        .catch((err) => {
            console.error(err);
        });

    let blog = JSON.parse(JSON.stringify(blogData));


    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time

    return {
        props: {
            blog,
        },
    }
}