import { useEffect, useState } from "react"
import { getProducts } from "../Components/Dashboard";
import { Box, Heading, useToast, Image, Text, Button, Grid, GridItem } from "@chakra-ui/react";

const cartArray = JSON.parse(localStorage.getItem('cart')) || [];


export const AllProducts = () => {
    const [products, setProducts] = useState(cartArray);
    const toast = useToast();

    const handleAddCart = (product)=>{
        const filterData  = cartArray.filter((item)=>{
            return item._id == product._id;
        });
        // console.log(filterData);
        if(filterData.length == 0){
            cartArray.push(product);
            localStorage.setItem('cart', JSON.stringify(cartArray));
            // setProducts(cartArray);
            toast({
                title: 'Product is added to cart',
                status: 'success',
                isClosable: true
            });
        }
        else{
            toast({
                title: 'Product is already present in the cart',
                status: 'error',
                isClosable: true
            });
        }
        
    } 

    useEffect(()=>{
        const data = getProducts();
        data.then(res=>{
            // console.log(res);
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        })
        
    }, [products])

    return (
        <Box padding='20px'>
            <Heading
            textAlign="left"
            fontSize='1.5rem'
            >Products</Heading>

            {(products.length !== 0)
            ? <Grid
            w="90%"
            margin='60px auto'
            templateColumns={{sm:'repeat(2, 1fr)', lg:'repeat(4, 1fr)'}}
            gap='20px'
            textAlign={'left'}
            >
                {
                    products && products.map((item, i) =>(
                        <GridItem key={i}
                        position='relative'
                        // border="1px"
                        
                        >
                            <Image 
                            width='100%'
                            src={item.image} alt="image" />
                            <Box 
                            position="relative"
                            bottom="10"
                            bgColor='white'
                            w='80%'
                            margin='auto'
                            padding='10px'
                            boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
                            display='flex'
                            flexDir='column'
                            gap='5px'
                           >
                                <Heading
                                fontSize='16px'
                                >{item.title}</Heading>
                                <Text
                                fontSize="14px"
                                >{item.description}</Text>
                                <Text
                                fontSize='14px'
                                color="#00ABC5"
                                >Rs. {item.price}</Text>
                                <Button 
                                w="100%"
                                borderRadius={0}
                                colorScheme="blue"
                                onClick={()=>handleAddCart(item)}>Add to cart</Button>
                            </Box>
                        </GridItem>
                    ))

                    
                }
            </Grid>
            : (
                        <Box >
                            <Box
                            minH='100vh'
                            display='flex'
                            flexDir='column'
                            gap='20px'
                            justifyContent='center'
                            alignItems='center'
                            margin='auto'
                            // border='1px'
                            >
                            
                                <Text
                                fontSize='2rem'
                                fontWeight='bold'
                                color="gray"
                                textAlign='center'
                                >
                                    No Product found
                                </Text>
                            </Box>
                    </Box>
                    )}
        </Box>
    )
}