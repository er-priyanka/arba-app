import { Box, 
    Stack, 
    Image, 
    Text, 
    Button,
    Flex, 
    Center, 
    Input,
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

// update profile
const postData = async (user) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/auth/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    return data;
}

// change password
const postChangePassword = async (user) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/auth/change-password`, {
        method: 'PATCH',
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
    const [updateProfile, setUpdateProfile] = useState(profile);
    const [password, setPassword] = useState({
        newPassword: "",
        oldPassword: ""
    });

    const [value, setValue] = useState('');
    const toast = useToast();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUpdateProfile({...updateProfile, [name]:value});
        // console.log(updateProfile);
    }

    

    const handleUpdate = () =>{
        postData(updateProfile).then(res=>{
            toast({
                title: 'Data updated seccessfully!',
                status: 'success',
                isClosable: true
            });
            // console.log(res);
        }).catch(err=>{
            toast({
                title: err.message,
                status: 'error',
                isClosable: true
            });
            // console.log(err);
        });
    }

    const handleModal = (val)=>{
        setValue(val);
        onOpen();
    }

    const handleChangePassword = (e)=>{
        const {name, value} = e.target;
        setPassword({...password, [name]: value});
    }

    const handleUpdatePassword = ()=>{
        postChangePassword(password).then(res=>{
            toast({
                title: "Password updated",
                status: 'success',
                isClosable: true
            });
            // console.log(res);
        }).catch(err=>{
            toast({
                title: err.message,
                status: 'error',
                isClosable: true
            });
            // console.log(err);
        });
    }

    useEffect(()=>{
        getProfile().then(res=>{
            setProfile(res);
            setUpdateProfile(res);
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }, [profile]);

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
                    onClick={()=>handleModal('update_profile')}
                    >Update Profile</Button>

                   
                </Center>

            </Stack>
            
            <Flex 
            w="fit-content"
            margin='50px auto'
            gap="20px"
            >
                <Button
                onClick={()=>handleModal('tc_modal')} 
                {...buttonStyleProps}>See T&C</Button>

                <Button onClick={()=>handleModal('change_password')} {...buttonStyleProps}>Change Password</Button>
            </Flex>

            {/* Term & conditions modal */}
            <TCModal isOpen={value =='tc_modal' && isOpen} onClose={onClose} />
             
             {/* update profile modal */}
            <Modal blockScrollOnMount={false} isOpen={value =='update_profile' && isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        <Input  name="fullName" value={updateProfile.fullName} onChange={handleChange} placeholder="Full name" type="text" />
                            
                         
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={handleUpdate}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* change password modal */}

            <Modal blockScrollOnMount={false} isOpen={value =='change_password' && isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        <Input name="oldPassword" 
                        placeholder="old password"
                        value={password.oldPassword} 
                        onChange={handleChangePassword} />
                        <Input name="newPassword" 
                        placeholder="new password"
                        mt="10px"
                        value={password.newPassword} 
                        onChange={handleChangePassword} />

                            
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={handleUpdatePassword}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            

            
        </Box>
    )
}