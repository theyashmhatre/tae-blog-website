import Head from 'next/head';
import Header from '../components/user/Layout/Header';
import Hero from "../components/user/Hero"
import { Button, Container, Divider, Heading, Stack } from "@chakra-ui/react"
import axios from 'axios';
import BlogCard from '../components/user/BlogCard';
import {db} from "../config/config"
import Footer from '../components/user/Layout/Footer/Footer';
import Link from 'next/link';
import IndexMetaTag from '../components/user/MetaTags/IndexMetaTag';
import { useState } from 'react';


export default function Home({blogs}) {

  const [loading, setLoading] = useState(false);

  return (
    <div style={{height:"100%"}}>
      {/* Head tag from NextJs allows to specify the page name */}
      <IndexMetaTag 
        desc = "An Engineer who likes to face new adventures and write about the experience. Trekking and Softwares are his forte, but may try something else periodically to spice things up!"
        coverImageUrl= "https://firebasestorage.googleapis.com/v0/b/the-adventurous-engineer.appspot.com/o/Logo%2Fyellow_logo_tae.png?alt=media&token=898ef120-9061-4d5f-8071-66adfc2ab940"
      />

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
      <Heading as="h2" margin="auto">
        Blogs
      </Heading>
        {blogs.map((blog) => {
          return <div key={blog.blogId}>
            <BlogCard
              blog={blog}
            />
          </div>
        })}
      </Stack>
      <Container centerContent={true} padding="30px 0px 10px 0px">
        <Button isLoading = {loading}
          colorScheme="blue"
          variant="solid"
          spinnerPlacement="start"
          onClick={() => setLoading(true)}
        >
          <Link href="/blogs">
            Read More...
          </Link>
      </Button>
      </Container>
      <Footer />


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
      return blogsList;
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
    revalidate: 10,
  }
}