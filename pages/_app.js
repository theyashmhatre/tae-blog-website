import '../styles/globals.css';
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import BlockContext from "../context/BlockContext"
import data from "../components/admin/CreatePost/AddBlock/objects/data"
import { useEffect, useState } from 'react';
import { extendTheme } from "@chakra-ui/react"
import { Fonts } from "../public/fonts/fonts"
import {AuthProvider} from "../lib/auth";

const theme = extendTheme({
  fonts: {
    heading: "Raleway"
  },
})

function MyApp({ Component, pageProps }) {

  const [blocks, setBlocks] = useState(data.content.body); // this will be provided to all the child components. setBlocks will help update the blocks in it

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BlockContext.Provider value={{ blocks, setBlocks }}>
          <Component {...pageProps} />
        </BlockContext.Provider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
