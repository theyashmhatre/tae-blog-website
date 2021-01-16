import React from 'react'
import { Grid } from "@chakra-ui/react";
import { ImParagraphLeft, ImImage } from "react-icons/im"
import { FaHeading, FaQuoteRight } from "react-icons/fa"
import { CgFormatSeparator } from "react-icons/cg"
import { FaVideo } from "react-icons/fa"
import ModalComponent from './ModalComponent';


//Grid Elements in the Add Block Modal. So, with this we can add any number of new blocks in the future without the need of any modification here.
export default function ModalGrid({UpdateBlocks}) {
    return (
        <div>
            <Grid templateColumns="repeat(3, 1fr)" gap={[0,6]}>
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Heading"
                    component="h1"
                    icon=<FaHeading />
                />
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Paragraph"
                    component="para"
                    icon=<ImParagraphLeft />
                />
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Image"
                    component="image"
                    icon=<ImImage />
                />
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Separator"
                    component="separator"
                    icon=<CgFormatSeparator />
                />
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Quote"
                    component="quote"
                    icon=<FaQuoteRight />
                />
                <ModalComponent
                    UpdateBlocks={UpdateBlocks}
                    title="Video"
                    component="video"
                    icon=<FaVideo />
                />
            </Grid>
        </div>
    )
}
