import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Grid
} from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri"
import { ImParagraphLeft, ImImage} from "react-icons/im"
import { FaHeading, FaQuoteRight} from "react-icons/fa"
import { CgFormatSeparator} from "react-icons/cg"
import { FiVideo} from "react-icons/fi"
import BlockContext from "../../../../context/BlockContext"
import uniqid  from "uniqid";
import BlockObject from "./objects/BlockObjects"
import ModalComponent from "./ModalComponent";
import ModalGrid from './Grid';

export default function ModalShow() {
    const { isOpen, onOpen, onClose } = useDisclosure();  // Chakra UI method for the functioning of the Modal
    const finalRef = useRef();
    const {blocks,setBlocks} = useContext(BlockContext);

    const [docHeight, setDocHeight] = useState(null);


    //used to clone the object. if we use normal "=" for making a new object, it would only reference to the original object in BlockObjects.js
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    useEffect(() => {
        if (docHeight){
            window.scrollTo(0, docHeight);
        }
    }, [docHeight]);

    function scrollToBottom() {
        setDocHeight(document.body.scrollHeight);
    }



    const UpdateBlocks = (value) => {
        let newUniqueId = uniqid(`${value}-`, '');  // generates a unique id from uniqid package
        let newBlockObject = clone(BlockObject[value]); //clones the object from BlockObjects.js

        newBlockObject._uid = newUniqueId;
        newBlockObject.timestamp = Date.now();
        

        setBlocks([
            ...blocks,  //spread operator which contains the previous value
            newBlockObject 
        ]);
        onClose();  // closes the Modal
        scrollToBottom();
    };


    return (
        <>
            <div >
            <Button onClick={onOpen} variant="solid" leftIcon={<RiAddCircleLine size="20px" />} colorScheme="blue" >
                Add Block
            </Button>
            </div>

            {/* Modal - Add Block */}
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Blocks</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalGrid 
                            UpdateBlocks= {UpdateBlocks}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
