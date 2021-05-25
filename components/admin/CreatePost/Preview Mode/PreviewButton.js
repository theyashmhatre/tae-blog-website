import { Button, useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BlockContext from '../../../../context/BlockContext';
import Link from 'next/link';


export default function PreviewButton() {

    const [draft, setDraft] = useState(false);
    const { blocks, setBlocks } = useContext(BlockContext);

    
    let value = blocks[0].value;
    let blogName = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    
    useEffect(() => {
        
        let localBlocks = JSON.parse(localStorage.getItem('componentList'));
        let draftId = localBlocks[0]._uid;

        axios.post('/api/admin/draft/checkDraftAvailability/', { draftId: draftId })
            .then((res) => {
                setDraft(res.data.draftPresent);
            });
    }, []);

    return (
        <>
            { draft ?
                <Button size={["xs","sm", "md", "lg"]} fontSize={["12px", "13px", "15px", "18px"]} padding="9px" colorScheme="blue" position="absolute" right={["1","2","3"]} marginRight={["5px","10px","20px"]} marginTop={["2px","4px"]}>
                    <Link href="/blogs/preview/[id]/[page_name]/" as={`/blogs/preview/${blocks[0]._uid}/${encodeURIComponent(blogName)}}/`}>
                        <a target="_blank">
                            Preview
                        </a>
                    </Link>
                </Button>
                :
                <Tooltip label="Save this blog as a draft to enable preview" aria-label="A tooltip">
                    <Button color={useColorModeValue("gray.200", "gray.500")} colorScheme="whiteAlpha" cursor="not-allowed" position="absolute" right="3" marginRight="20px" marginTop="4px">Preview</Button>
                </Tooltip>

            }
        </>
    )
}
