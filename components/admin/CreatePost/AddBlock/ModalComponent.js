import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from "./styles/ModalContainer.module.css"

//This function returns a single child element of the Modal on ModalShow.js

export default function ModalComponent(props) {
    const [hover,setHover] = useState(false);
    const value = useColorModeValue("blue","white");
    const linkStyle = {
        backgroundColor: useColorModeValue("gainsboro", "gray"),
        borderRadius: "5px",
    }
    return (
        <div>
            <Box
                as="button" 
                className={styles.box} 
                onClick={() => 
                { props.UpdateBlocks(props.component) }} 
                w={["100px","110px","120px"]}
                onMouseEnter={()=>{setHover(true)}}
                onMouseLeave={() => { setHover(false) }}
                style= {hover? linkStyle : null}
            >

                {/* Icon */}
                <div className={styles.icon}>
                    {props.icon}
                </div>

                {/* Text */}
                <Text className={styles.text} fontSize={["12px","15px","17px"]}>
                    {props.title}
                </Text>
            </Box>
        </div>
    )
}
