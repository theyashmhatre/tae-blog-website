import Head from 'next/head'
import React from 'react'

//Meta Data for the head tag of single blog posts. og=Open Graph
export default function IndexMetaTag(props) {
    return (
        <Head>
            <title>The Adventurous Engineer</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <meta name="description" content={props.desc} />
            <meta property="og:type" content="wesbite" />
            <meta name="og:title" property="og:title" content="" />
            <meta name="og:description" property="og:description" content={props.desc} />
            <meta property="og:site_name" content="" />
            <meta property="og:image" content={props.coverImageUrl} />
            <meta property="og:url" content="" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="The Adventurous Engineer" />
            <meta name="twitter:description" content={props.desc} />
            <meta name="twitter:site" content="" />
            <meta name="twitter:image" content={props.coverImageUrl} />
            <meta name="robots" content="index, follow" />
            <meta name="twitter:creator" content="The Adventurous Engineer" />
            {/* <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
                <link rel="stylesheet" href="" /> */}
        </Head>
    )
}
