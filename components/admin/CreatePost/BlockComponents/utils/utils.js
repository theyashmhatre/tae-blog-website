import React, { useContext, useState } from 'react'
import BlockContext from "../../../../../context/BlockContext";


export const swapElement = (index, setBlocks, action) => {

    console.log(index);
    
    setBlocks(array => {
        let data = [...array];
        let temp = data[index];
        let prev = data[index - 1];
        let next = data[index + 1];
        
        if (action === "up" && index >= 2){
            data[index - 1] = temp;
            data[index] = prev;
        }
        if (action === "down" && data.length > index + 1) {
            data[index + 1] = temp;
            data[index] = next;
        }
        return data;
    });
}

export function handleChange(event, blockValue,setBlockValue) {
    const value = event.target.value;
    setBlockValue({
        ...blockValue,
        [event.target.name]: value
    });
}