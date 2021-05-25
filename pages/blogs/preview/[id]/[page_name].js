import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from "../../../../components/user/Layout/Header"
import { Stack } from '@chakra-ui/react';
import Components from '../../../../components/user/CreateComponents/CreateComponents';
import { db } from "../../../../config/config"
import Footer from '../../../../components/user/Layout/Footer/Footer';
import BlogTags from '../../../../components/user/SingleBlogComponents/BlogTags';
import AddComment from '../../../../components/user/SingleBlogComponents/AddComment';
import Comments from '../../../../components/user/SingleBlogComponents/Comments';
import Head from 'next/head';



export default function PreviewPost({ blog, id }) {

    if (!blog) {
        return (<div>Loading blog</div>);
    };
    let blocks = blog.blocks;

    return (
        <div>
            <Head><title>{blocks[0].value} - The Adventurous Engineer</title></Head>
            <Header />
            <Stack spacing={8} w={["90%", "80%", "80%", "75%"]} padding="0px 10px 0px 5px" style={{ margin: "auto" }}>
                {blocks.map(block => Components(block))}
            </Stack>
            <BlogTags
                tags={blocks[0].tags}
            />
            <Footer />
        </div>
    )
}

export async function getServerSideProps({ params }) {

    let blogData = [];
    let id = params.id;

    await db.doc(`/drafts/${params.id}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("Draft Not Found, ID -", params.id);
            }

            blogData = doc.data();

        })
        .catch((err) => {
            console.error("page_name getStaticProps err:", err);
        });

    let blog = JSON.parse(JSON.stringify(blogData));


    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time

    return {
        props: {
            blog,
            id
        },
    }
}