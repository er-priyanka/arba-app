import { Box, Flex, Stack, Input, Image, Text, Heading, Link, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import authImage from "../Images/auth_ui.png";



const iniState = {
    userName: '',
    password: ''
}

const postData = async(user)=>{
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    return data;
}

const inputStyleProps = {
    borderRadius: 0,
    colorScheme: "whiteAlpha",
    border: "0px",
    borderBottom: "1px",
    bgColor:"white",
    marginTop:"20px"
}

export const Login = () =>{
    const [user, setUser] = useState(iniState);
    const navigate = useNavigate();
    const toast = useToast();
    // const token = localStorage.getItem('token');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let data = await postData(user);
        console.log(data);

        if(data.token){
            toast({
                title: data.message,
                status: 'success',
                isClosable: true
            });

            localStorage.setItem('token', data.token);
            navigate('/');
        }else{
           toast({
             title: data.message,
             status: "error",
             isClosable: true
           }) 
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    }, [])

    return (
        <Box w="100%">
            <Flex 
            justifyContent='center'
            // marginTop="30px"
            >
                <Box 
                w="40%"
                // border='1px'
                >
                    <Image w="100%" height="100vh" src={authImage} />
                </Box>
                <Box 
                w="60%"
                padding="40px 10px"
                >
                    <Stack
                    w="50%"
                    m='auto'  
                    textAlign='left'
                    >
                        <form onSubmit={handleSubmit}>
                            <Box></Box>
                            <Heading
                            textAlign={'center'} 
                            >APP NAME</Heading>
                            <Text textAlign={'center'}>lorem ipsum dolor sit amet, consecteur adipiscing elit.</Text>
                            <Input {...inputStyleProps} name="userName" value={user.userName} onChange={handleChange} placeholder="Username" type="text" />
                            <Input {...inputStyleProps} name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
                            <Input
                            bgColor={'blue.600'}
                            marginTop="40px"
                            color='white'
                            cursor='pointer'
                            type="submit" value="Login" />
                            
                        </form>
                        
                        <Text 
                        marginTop="20px"
                        >
                            Don't have an account? <Link href="/signup">Sign up</Link>
                        </Text>

                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}