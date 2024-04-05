import { Carousel } from "../Components/Carousel";
import { Box } from "@chakra-ui/react";
import { Products } from "../Components/Products";
import { useEffect, useState } from "react";

const getProducts = async()=>{
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
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        })
        
    }, [products])

    return (
        <>
            <Carousel />
            <Products data={products} />
        </>
    )
}