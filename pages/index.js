import Head from 'next/head';
import Header from '../components/user/Layout/Header';
import Hero from "../components/user/Hero"
import { Divider } from "@chakra-ui/react"


export default function Home() {
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
    </div>
  )
}
