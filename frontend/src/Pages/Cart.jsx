import { useEffect, useState } from "react"
import { Box, Heading, useToast, Image, Text, Button, Grid, GridItem, Center, Stack } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";

const cartArray = JSON.parse(localStorage.getItem('cart')) || [];


export const Cart = () => {
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
            setProducts(cartArray);
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
    const handleCheckout = () =>{
        localStorage.removeItem('cart');
        toast({
            title: "Checked out",
            status: "success",
            isClosable: true
        });
        setProducts([]);
    }

    useEffect(()=>{
        const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
        setProducts(cartArray);
        
    }, [products])

    return (
        <Box
        textAlign='right'
        padding='20px'
        // border='1px'
        >
            <Heading 
            textAlign='left'
            fontSize='1.5rem'
            >My Carts</Heading>

           
            {
                (products.length !== 0)
                ?
                <Box 
                w="90%"
                margin='30px auto'
                >
                    <Grid
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
                    <Button 
                    colorScheme="blue"
                    borderRadius='0' 
                    textAlign='right' 
                    onClick={handleCheckout}>Checkout</Button>


                </Box>
                : (
                    <Box 
                    >
                        <Box
                        minH='100vh'
                        display='flex'
                        flexDir='column'
                        gap='20px'
                        justifyContent='center'
                        alignItems='center'
                        // border='1px'
                        >
                            <TiShoppingCart
                            fontSize='200px' 
                            color="gray"
                             />
                            <Text
                            fontSize='2rem'
                            fontWeight='bold'
                            color="gray"
                            >
                                Cart is Empty!
                            </Text>
                        </Box>
                    </Box>
                )
                    
                }

        
        </Box>
    )
}