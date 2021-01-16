import React from 'react'
import BlogTitle from "../SingleBlogComponents/BlogTitle"
import ParaBlock from "../SingleBlogComponents/ParaBlock"
import VideoBlock from "../SingleBlogComponents/VideoBlock"
import ImageBlock from "../SingleBlogComponents/ImageBlock"
import HeadingBlock from "../SingleBlogComponents/HeadingBlock"
import SeparatorBlock from "../SingleBlogComponents/SeparatorBlock"
import QuoteBlock from "../SingleBlogComponents/QuoteBlock"

const Components = {
    header: BlogTitle,
    h1: HeadingBlock,
    para: ParaBlock,
    image: ImageBlock,
    separator: SeparatorBlock,
    quote: QuoteBlock,
    video: VideoBlock,
};

export default function CreateComponents(block) {
    if (typeof Components[block.component] !== "undefined") {
        return React.createElement(Components[block.component], {
            key: block._uid,
            block: block
        });
    }
    uniqueID = uniqid()
    return React.createElement(
        () => <div>The component {block.component} has not been created yet.</div>,
        { key: uniqueID }
    );
}
