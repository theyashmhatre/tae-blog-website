import Head from 'next/head';
import Header from '../components/user/Layout/Header';
import Hero from "../components/user/Hero"
import { Divider, Stack } from "@chakra-ui/react"
import axios from 'axios';
import BlogCard from '../components/user/BlogCard';


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
  const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://the-adventurous-engineer.vercel.app";
  const blogsList = await axios.get(host +"/api/client/blog/getAllBlogs");

  let Allblogs = JSON.parse(JSON.stringify(blogsList.data));
  let blogs = Allblogs.slice(0,5);

  return {
    props: {
      blogs,
    },
  }
}