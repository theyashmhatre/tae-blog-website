import React from 'react'
import {
    Tag, TagLabel, Text, Box
} from "@chakra-ui/react"

export default function BlogTags({tags}) {

    return (
        <Box spacing={[6, 8]} w={["90%", "80%", "80%", "75%"]} padding="30px 10px 0px 5px" style={{ margin: "auto" }}>
            {/* <Text fontWeight="bold" textAlign="center" marginBottom="10px" fontSize="22px">
                Tags
           </Text> */}
            <ul style={{ listStyle: "none", textAlign:"center" }}>
                {tags ? tags.map((tag, index) => (

                    <li style={{ display: "inline-block", marginBottom:"10px" }} key={index}>
                        <Box style={{ marginRight: "10px", marginBottom: "200px", display: "inline" }}>
                            <Tag size={["lg"]} key={tag} fontSize={["13px", "16px"]} variant="outline" >
                                <TagLabel>
                                    {tag}
                                </TagLabel>
                            </Tag>
                        </Box>
                    </li>
            )) : <></>}
            </ul>
        </Box>
    )
}
