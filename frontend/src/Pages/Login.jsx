import { Box, Flex, Stack, Input, Text, Heading, Link, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const iniState = {
    userName: '',
    password: ''
}

const postData = async(user)=>{
    const res = await fetch(`http://localhost:8080/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    return data;
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
                            <Input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
                            <Input  type="submit" value="Login" />
                            
                        </form>
                        
                        <Text>
                            Don't have an account? <Link href="/signup">Sign up</Link>
                        </Text>

                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}