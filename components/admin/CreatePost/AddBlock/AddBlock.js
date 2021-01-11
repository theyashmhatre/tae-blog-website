import React from 'react'
import BlockHeading from "../BlockComponents/BlockHeading"
import BlockImage from "../BlockComponents/BlockImage"
import BlockPara from "../BlockComponents/BlockPara"
import uniqid from "uniqid";
import BlogHeader from '../BlockComponents/BlogHeader';
import Separator from '../BlockComponents/Separator';
import BlockQuote from '../BlockComponents/BlockQuote';
import VideoBlock from '../BlockComponents/VideoBlock';

const Components = {
    header: BlogHeader,
    h1: BlockHeading,
    para: BlockPara,
    image: BlockImage,
    separator: Separator,
    quote: BlockQuote,
    video:VideoBlock,
};

export default function AddBlock(block) {
    if (typeof Components[block.component] !== "undefined") {
        return React.createElement(Components[block.component], {
            key: block._uid,
            block: block
        });
    }
    uniqueID = uniqid()
    return React.createElement(
        () => <div>The component {block.component} has not been created yet.</div>,
        { key:  uniqueID}
    );
}
