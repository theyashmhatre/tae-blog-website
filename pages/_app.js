import '../styles/globals.css';
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import BlockContext from "../context/BlockContext"
import data from "../components/admin/CreatePost/AddBlock/objects/data"
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [blocks, setBlocks] = useState(data.content.body); // this will be provided to all the child components. setBlocks will help update the blocks in it

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </BlockContext.Provider>
  )
}

export default MyApp
