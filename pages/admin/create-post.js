import React, { useContext, useEffect, useState } from 'react'
import Head from "next/head"
import { Heading, Stack, StackDivider, Flex, Spacer, Button, Text } from "@chakra-ui/react" 
import ModalShow from "../../components/admin/CreatePost/AddBlock/ModalShow"
import Components from "../../components/admin/CreatePost/AddBlock/AddBlock"
import BlockContext from "../../context/BlockContext"
import RightDrawer from '../../components/admin/CreatePost/RightDrawer/Drawer'
import uniqid from "uniqid";
import { DependencyList } from "react";
import data from "../../components/admin/CreatePost/AddBlock/objects/data"
import styles from "../../styles/CreatePost.module.css"
import StickyFooter from '../../components/admin/CreatePost/Footer/StickyFooter'
import {Fonts} from "../../public/fonts/fonts"

export default function CreatePost() {

    const {blocks, setBlocks} = useContext(BlockContext);

    useEffect(() => {
            //it sets the localstorage as default blockList if it is empty
            if (localStorage.getItem('componentList') === null) {
                blocks[0]._uid = uniqid('blog-', '');
                localStorage.setItem('componentList', JSON.stringify(blocks));
            }

            //incase of a refresh, the blocks is set to it's default value from the data.js of which the length is 1
            //checks if length is 1, and sets the blocks to the previously held localStorage value.

            else if (blocks.length === 1) {
                const locallist = JSON.parse(localStorage.getItem('componentList'));
                setBlocks(locallist);
            }

            //this is executed after every change in blocks. Because we've specified blocks in the condition of useEffect below
            else {
                localStorage.setItem('componentList', JSON.stringify(blocks));
            }
        
    },[blocks.length]);


    return (
        <div style={{paddingBottom:"50px"}}>
            <Head>
                <title>Create Post</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>

            <Heading fontFamily="Raleway" fontSize={["25px", "30px", "40px"]} textAlign="center" border="1px solid black" color="white" bgColor="gray.900" padding="10px 0px">
                Create Post
            </Heading>

            <div>
                <Stack spacing={8} w={["90%", "80%", "70%", "800px"]} style={{ margin: "auto" }}>

                    {/* this map function maps all the objects in the blocks and send them one by one to AddBlock.js which creates the Components */}
                    {blocks.map(block => Components(block))}  

                </Stack>
                <StickyFooter />
            </div>

        </div>
    )
}
