import { Box, Flex, Stack, Input, Text, Heading, useToast, Link, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authImage from "../Images/auth_ui.png";


const iniState = {
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const inputStyleProps = {
    borderRadius: 0,
    colorScheme: "whiteAlpha",
    border: "0px",
    borderBottom: "1px",
    bgColor:"white",
    marginTop:"20px"
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
                            <Heading  textAlign={'center'} >APP NAME</Heading>
                            <Text textAlign={'center'}>lorem ipsum dolor sit amet, consecteur adipiscing elit.</Text>
                            <Input {...inputStyleProps} name="userName" value={user.userName} onChange={handleChange} placeholder="Username" type="text" />
                            <Input {...inputStyleProps} name="fullName" value={user.fullName} onChange={handleChange} placeholder="Fullname" type='text' />
                            <Input {...inputStyleProps} name='email' value={user.email} onChange={handleChange} placeholder='Email' type='email' />
                            <Input {...inputStyleProps} name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
                            <Input {...inputStyleProps} name='confirmPassword' value={user.confirmPassword} onChange={handleChange} placeholder="Confirm password" type='password' />
                            <Input 
                            bgColor={'blue.600'}
                            marginTop="40px"
                            color="white" 
                             type="submit" value="Register" />
                            
                        </form>

                        <Text
                        marginTop="20px"
                        >
                            Already have an account? <Link href="/login">Login</Link>
                        </Text>
                        

                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}