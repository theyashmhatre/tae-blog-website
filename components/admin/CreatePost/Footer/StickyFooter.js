import React, { useContext } from 'react'
import RightDrawer from '../../CreatePost/RightDrawer/Drawer'
import {Flex,Button,Spacer,Heading, Box, useColorModeValue} from "@chakra-ui/react";
import BlockContext from '../../../../context/BlockContext';
import ModalShow from '../AddBlock/ModalShow';
import LeftDrawer from '../LeftDrawer/LeftDrawer';
export default function StickyFooter() {

    const {blocks,setBlocks} = useContext(BlockContext);
    const value = useColorModeValue("white", "#1A202C");

    const footerStyle = {
        fontSize: "20px",
        color: "black",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "80px",
        width: "100%",
        boxShadow:"10px 10px 8px #888888"
    };

    const phantomStyle = {
        display: "block",
        padding: "20px",
        height: "60px",
        width: "100%",
    };


    return (
        <div>
            <div style={phantomStyle} />
            <Box style={footerStyle} bgColor={value} borderTopColor={!value} borderTopWidth="1px">
                <Flex>
                    <LeftDrawer />
                    <Spacer />
                    <ModalShow />
                    <Spacer />
                    <RightDrawer />
                </Flex>
            </Box>
        </div>
    )
}
