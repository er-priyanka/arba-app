import { Box, Flex, Text, Image, Menu, MenuButton, Portal, MenuItem, MenuList } from "@chakra-ui/react";
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const avatar = "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
export const Navbar = () =>{
    const navigate = useNavigate();

    return (
        <Box
        padding="8px 10px"
        >
            <Flex 
            justifyContent='space-between'
            >
                <Box>
                    <Text>Logo</Text>
                </Box>
                <Flex 
                gap="10px"
                alignItems='center'
                >
                    <BsCartFill onClick={()=>navigate('/cart')} />
                    <Box>
                        <Menu>
                            <MenuButton
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            b
                            >
                                <Image border='1px solid gray' borderRadius='50%' w='20px' h='20px' src={avatar} alt="profile" />
                                
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem>My Store</MenuItem>
                                    <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                    
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}