import { Box, Flex, Text, Image, Menu, MenuButton, Portal, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const avatar = "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"

const logout = async()=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/auth/logout`, {
        method: 'POST',
        headers: {
            'Authorization': token
        }
    });
    localStorage.removeItem('token');

    const data = await res.json();
    return data;
}

export const getProfile = async() =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/auth/profile`, {
        headers: {
            'Authorization': token
        }
    });
   
    const data = await res.json();
    return data;
}

export const Navbar = () =>{
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const toast = useToast();
    

    const handleLogout = ()=>{
        logout().then(res=>{
            console.log(res);
            setToken(null);
            toast({
                title: res.message,
                status: 'success',
                isClosable: true
            });
            navigate('/login');
        }).catch(err=>{
            toast({
                title: err.message,
                status: 'error',
                isClosable: true
            })
        });
    }


    useEffect(()=>{
        const getToken = localStorage.getItem('token');
        setToken(getToken);
        getProfile().then(res=>{
            const getToken = localStorage.getItem('token');
            setToken(getToken);
            setProfile(res);
        }).catch(err=>{
            console.log(err);
        })
    }, [token]);

    return (
        <Box
        padding="10px 30px"
        // border='1px'
        position='sticky'
        top='0'
        width='100%'
        bgColor='white'
        zIndex='100'

        >
            <Flex 
            justifyContent='space-between'
            alignItems='center'
            >
                <Box
                bgColor='#00ABC5' 
                padding='3px 20px'
                color="white"
                fontWeight='bold'
                cursor='pointer'
                onClick={()=>navigate('/')}
                >
                    <Text>Logo</Text>
                </Box>

                <Flex 
                gap="20px"
                alignItems='center'
               
                >
                    <BsCartFill
                     color="#00ABC5"
                     fontSize='1.5rem' 
                     onClick={()=>navigate('/cart')} />
                    <Box>
                        <Menu>
                            <MenuButton
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            
                            >
                                <Image 
                                borderRadius='50%' 
                                w='30px' 
                                h='30px' 
                                src={profile.avatar || avatar} alt="profile" />
                                
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={()=>navigate('/mystore')}>My Store</MenuItem>
                                    <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}