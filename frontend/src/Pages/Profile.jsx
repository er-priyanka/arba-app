import { Box, 
    Stack, 
    Image, 
    Text, 
    Button,
    Flex, 
    Center, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    useDisclosure,
    useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProfile } from "../Components/Navbar";
import { TCModal } from "../Components/TCModal";


const buttonStyleProps = {
    colorScheme: "blue",
    borderRadius: "0",
    width:"fit-content",
    fontSize: "14px"
}

const postData = async (user) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/auth/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    return data;
}

export const Profile = () =>{
    const [profile, setProfile] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updateProfile, setUpdateProfile] = useState(profile.name || null);
    const [value, setValue] = useState('');
    const toast = useToast();

    const handleUpdate = () =>{
        postData().then(res=>{
            toast({
                title: res.message,
                status: 'success',
                isClosable: true
            });
            console.log(res);
        }).catch(err=>{
            toast({
                title: err.message,
                status: 'error',
                isClosable: true
            });
            console.log(err);
        });
    }

    useEffect(()=>{
        getProfile().then(res=>{
            setProfile(res);
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }, []);

    return (
        <Box>
            <Stack
            borderBottom='1px' 
            borderColor='gray.300'
            padding='10px'
            textAlign='center'
            >
                <Image
                w="150px"
                m="auto"
                 src={profile && profile.avatar} />
                <Text>{profile && profile.fullName }</Text>
                <Text>{profile && profile.email }</Text>
                <Center>
                    <Button {...buttonStyleProps}
                    onClick={onOpen}
                    >Update Profile</Button>

                    {/* update profile modal */}
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Update Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                            </Button>
                            <Button variant='ghost' onClick={handleUpdate}>Update</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Center>

            </Stack>
            
            <Flex 
            w="fit-content"
            margin='50px auto'
            gap="20px"
            >
                <Button
                onClick={onOpen} 
                {...buttonStyleProps}>See T&C</Button>
                <Button {...buttonStyleProps}>Change Password</Button>
            </Flex>

            <TCModal isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}