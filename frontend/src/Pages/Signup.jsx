

import { Box, Flex, Stack, Input, Text, Heading, useToast, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const iniState = {
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const postData = async(user)=>{
    const res = await fetch(`http://localhost:8080/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    return data;
}

export const Signup = () =>{
    const [user, setUser] = useState(iniState);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        let data = await postData(user);

        if(data.newUser){
            toast({
                title: data.message,
                status: 'success',
                isClosable: true
            })
            navigate('/login');
        }else{
           toast({
             title: data.message,
             status: "error",
             isClosable: true
           }) 
        }

        console.log(data);
    }

    return (
        <Box>
            <Flex>
                <Box>
                    Image
                </Box>
                <Box>
                    <Stack>
                        <form onSubmit={handleSubmit}>
                            <Box></Box>
                            <Heading>APP NAME</Heading>
                            <Text>lorem ipsum dolor sit amet, consecteur adipiscing elit.</Text>
                            <Input name="userName" value={user.userName} onChange={handleChange} placeholder="Username" type="text" />
                            <Input name="fullName" value={user.fullName} onChange={handleChange} placeholder="Fullname" type='text' />
                            <Input name='email' value={user.email} onChange={handleChange} placeholder='Email' type='email' />
                            <Input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
                            <Input name='confirmPassword' value={user.confirmPassword} onChange={handleChange} placeholder="Confirm password" type='password' />
                            <Input  type="submit" value="Register" />
                            
                        </form>

                        <Text>
                            Already have an account? <Link href="/login">Login</Link>
                        </Text>
                        

                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}