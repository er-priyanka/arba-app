import { Carousel } from "../Components/Carousel";
import { Box } from "@chakra-ui/react";
import { Products } from "../Components/Products";
import { useEffect, useState } from "react";

export const getProducts = async()=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/product`,{
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
            setProducts((res.length > 8) ? res.slice(0, 8): res);
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