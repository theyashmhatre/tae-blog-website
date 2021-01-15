import Head from 'next/head';
import Header from '../components/user/Layout/Header';
import Hero from "../components/user/Hero"
import { Divider, Stack } from "@chakra-ui/react"
import axios from 'axios';
import BlogCard from '../components/user/BlogCard';
import {db} from "../config/config"


export default function Home({blogs}) {
  return (
    <div>
      {/* Head tag from NextJs allows to specify the page name */}
      <Head>
        <title>The Adventurous Engineer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      {/* Navbar */}
      <Header />

      <Hero
        title="Subscribe to this blog"
        subtitle="So you can get stories early in your mailbox"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="Subscribe now"
      />

      <Divider orientation="horizontal" colorScheme="black" size="15px 15px" />
      <Stack spacing={8} w={["100%","90%","80%"]} margin="auto" paddingTop="40px">
        {blogs.map((blog) => {
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
  let Allblogs = JSON.parse(JSON.stringify(blogsList));
  let blogs = Allblogs.slice(0,5);

  return {
    props: {
      blogs,
    },
  }
}