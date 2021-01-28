import React from 'react'
import {
    Tag, TagLabel, Text,Grid, Box
} from "@chakra-ui/react"

export default function BlogTags({tags}) {
    return (
        <Box spacing={[6, 8]} w={["90%", "80%", "80%", "75%"]} padding="30px 10px 0px 5px" style={{ margin: "auto" }}>
        <Text>
            Tags : 
        </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={[3,6]}>
                {tags ? tags.map((tag) => (
                    <Tag size={["lg"]} key={tag} fontSize={["13px","16px"]} variant="solid" colorScheme="teal">
                        <TagLabel>
                            {tag}
                        </TagLabel>
                    </Tag>
                )) : <></>}
            </Grid>
        </Box>
    )
}
