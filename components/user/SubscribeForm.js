import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useToast, Text, useDisclosure, Stack, Input, Heading, Icon, Flex, useColorModeValue,
} from "@chakra-ui/react";
import { GoMailRead } from "react-icons/go";
import axios from 'axios';

export default function SubscribeForm() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email_address: '',
    });

    function handleChange(event) {
        const value = event.target.value;
        setUserDetails({
            ...userDetails,
            [event.target.name]: value
        });
    }

    function onKeyPressHandler(e) {
        e.preventDefault();
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        axios.post("/api/client/subscribers/subscription/", { email_address: userDetails.email_address })
            .then((res) => {
                console.log("successful");
                toast({
                    title: "Subscription Confirmed ✅",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                    position: 'bottom'
                });
            })
            .catch((err) => {
                let msg = err.response.data.msg ? err.response.data.msg : 'Something went wrong';
                toast({
                    title: msg,
                    description: 'Please try again...',
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                });
                
            });

        setIsLoading(false);
        setUserDetails({
            email_address: '',
        });
    }

    return (
        <>
            <Button variantColor="primary"
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                onClick={onOpen}
            >
                Subscribe
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent margin="20px">
                    <Flex
                        align={'center'}
                        justify={'center'}>
                        <Stack
                            boxShadow={'2xl'}
                            bg={useColorModeValue('white', 'gray.700')}
                            rounded={'xl'}
                            p={10}
                            spacing={8}
                            align={'center'}>
                            <Icon as={GoMailRead} color="yellow.300" w={24} h={24} />
                            <Stack align={'center'} spacing={2}>
                                <Heading
                                    textTransform={'uppercase'}
                                    fontSize={'3xl'}
                                    color={useColorModeValue('gray.800', 'gray.200')}
                                >
                                    Subscribe
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.500'} textAlign="center">
                                    Subscribe to our newsletter & stay up to date!
                                </Text>
                            </Stack>
                            <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                                <Input
                                    type={'text'}
                                    placeholder={'john@doe.net'}
                                    color={useColorModeValue('gray.800', 'gray.200')}
                                    bg={useColorModeValue('gray.100', 'gray.600')}
                                    rounded={'full'}
                                    border={0}
                                    name="email_address"
                                    value={userDetails.email_address}
                                    onChange={handleChange}
                                    _focus={{
                                        bg: useColorModeValue('gray.200', 'gray.800'),
                                        outline: 'none',
                                    }}
                                />
                                <Button
                                    bg={'blue.400'}
                                    rounded={'full'}
                                    color={'white'}
                                    flex={'1 0 auto'}
                                    _hover={{ bg: 'blue.500' }}
                                    _focus={{ bg: 'blue.500' }}
                                    onClick={handleSubmit}
                                    isLoading={isLoading}
                                >
                                    Subscribe
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}
