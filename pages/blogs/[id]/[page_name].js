import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from "../../../components/user/Layout/Header"
import Head from 'next/head';
import { Stack } from '@chakra-ui/react';
import Components from '../../../components/user/CreateComponents/CreateComponents';
import SeoMeta from '../../../components/user/MetaTags/seo-meta';
import { db } from "../../../config/config"
import Footer from '../../../components/user/Layout/Footer/Footer';
import BlogTags from '../../../components/user/SingleBlogComponents/BlogTags';
import AddComment from '../../../components/user/SingleBlogComponents/AddComment';
import Comments from '../../../components/user/SingleBlogComponents/Comments';



export default function SinglePost({ blog, id }) {

    const { isFallback } = useRouter();
    console.log("isfallback", isFallback);
    if (isFallback) {
        return (
            <div>
                <h1>Loading</h1>
            </div>);
    }
    if (!blog) {
        return (<div>Loading blog</div>);
    };
    let blocks = blog.blocks;

    return (
        <div>
            <SeoMeta
                title={blocks[0].value}
                coverImageUrl={blocks[0].coverImageUrl}
                desc={blocks[0].blogDescription}
            />
            <Header />
            <Stack spacing={8} w={["90%", "80%", "80%", "75%"]} padding="0px 10px 0px 5px" style={{ margin: "auto" }}>
                {blocks.map(block => Components(block))}
            </Stack>
            <BlogTags
                tags={blocks[0].tags}
            />
            <Comments
                blogId={id}
                blogName={blocks[0].value}
            />
            <Footer />
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
        params: { id: blog.blogId, page_name: encodeURIComponent(blog.blocks[0].value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')) },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths: paths, fallback: true }
}


export async function getStaticProps({ params }) {

    let blogData = [];
    let id = params.id;

    await db.doc(`/blogs/${params.id}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("Blog Not Found, ID -", params.id);
            }

            blogData = doc.data();

        })
        .then(()=>{

            //updates views count by 1 everytime a single post is viewed
            var blogRef = db.doc(`/blogs/${params.id}`);
            blogRef.update({
                views: firebase.firestore.FieldValue.increment(1),
            });

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
        revalidate: 10,
    }
}