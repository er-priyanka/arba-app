import { Box, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import { StoreCategoryTable } from "../Components/StoreCategoryTable";
import { useEffect, useState } from "react";
import { StoreProductTable } from "../Components/StoreProductTable";

export const getData = async (param)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/${param}`,{
        headers:{
            'Authorization': token
        }
    });
    const data = await res.json();
    return data;
}

export const MyStore = () =>{
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getProducts = getData("product");
        getProducts.then(res=>{
            console.log('product',res);
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        });

        const getCategories = getData("category");
        getCategories.then(res=>{
            console.log('category' , res);
            setCategories(res);
        }).catch(err=>{
            console.log(err);
        })



    }, []);
    return (
        <Box>
            <Tabs  
            w="80%"
            m="30px auto"
            variant="solid-rounded"
            colorScheme="telegram"
            isFitted
            >
                <TabList 
                color='white'  
                bgColor='gray.300'
                >
                    <Tab 
                    borderRadius='0'
                    color='white'
                    >Categories</Tab>
                    <Tab
                    color='white'
                    borderRadius='0'
                    >Products</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <StoreCategoryTable data={categories} />
                    </TabPanel>
                    <TabPanel>
                        <StoreProductTable categories={categories} data={products} />
                    </TabPanel>
                </TabPanels>
                
            </Tabs>
            
        </Box>
    )
}