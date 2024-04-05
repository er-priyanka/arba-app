import { Carousel } from "../Components/Carousel";
import { Box } from "@chakra-ui/react";
import { Products } from "../Components/Products";
import { useEffect, useState } from "react";

export const getProducts = async()=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/product`,{
        headers:{
            'Authorization': token
        }
    });
    const data = await res.json();
    return data;
}

export const Dashboard = () =>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const data = getProducts();
        data.then(res=>{
            // console.log(res);
            setProducts(res.slice(0, 8));
        }).catch(err=>{
            console.log(err);
        })
        
    }, [products])

    return (
        <Box>
            {/* <Carousel /> */}
            <Products products={products} />
        </Box>
    )
}