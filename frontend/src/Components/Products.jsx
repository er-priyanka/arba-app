import { Box, Heading, Image, Text, Button } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const Products = ({products}) => {
    const navigate = useNavigate();
    return (
        <Box>
            <Heading>Products</Heading>
            {
                products && products.map((item, i) =>(
                    <Box key={i}>
                        <Image />
                        <Box>
                            <Heading></Heading>
                            <Text></Text>
                            <Text></Text>
                            <Button>Add to cart</Button>
                        </Box>
                    </Box>
                ))
            }
            <Button onClick={()=>navigate('/allproducts')}>{`All Products >>`}</Button>
        </Box>
    )
}