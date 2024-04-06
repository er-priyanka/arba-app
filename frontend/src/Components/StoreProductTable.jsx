import { 
    Box,
    Flex,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Image,
    TableContainer,
    useToast,
    useDisclosure,
 } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UpdateProductModal } from "./UpdateProductModal";
import { getData } from "../Pages/MyStore";
import { AddProductModal } from "./AddProduct";



const buttonStyleProps = {
    variant: 'unstyled',
    bgColor: "blue.500",
    color:"white",
    borderRadius: "0",
    padding: "5px 15px",

}



const deleteProduct = async (id) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
       
    });

    const data = await res.json();
    return data;
}




export const StoreProductTable = ({data, categories})=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [view, setView] = useState('');
    const [productId, setProductId] = useState(0);
    const [products, setProducts] = useState(data);
    const toast = useToast();



    const handleModal = (val, id)=>{
        setView(val);
        setProductId(id);
        onOpen();
    }

   
    const handleRefresh = ()=>{
        const getProducts = getData("product");
        getProducts.then(res=>{
            console.log('product',res);
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        });
    }

    

    const handleDelete = (id)=>{
        deleteProduct(id).then(res=>{
            toast({
                title: res.message,
                status: 'success',
                isClosable: true
            });
        }).catch(err=>{
            toast({
                title: err.message,
                status: "error",
                isClosable: true
            });
        })

        handleRefresh();
    }

    
    // console.log(data);

    useEffect(()=>{
        const getProducts = getData("product");
        getProducts.then(res=>{
            // console.log('category' , res);
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        })
        
    }, [products])

    return (
        <Box>
            <Flex mt='30px' gap='15px'>
                <Button onClick={handleRefresh} {...buttonStyleProps}>
                    Refresh
                </Button>
                <Button {...buttonStyleProps}>
                    Filter
                </Button>
                <Button
                onClick={()=>handleModal("addModal")}
                 {...buttonStyleProps}>
                    Add
                </Button>
            </Flex>

            <TableContainer marginTop='30px'>
                <Table 
                variant='unstyled'
                // border='1px'
                >
                    <Thead>
                    <Tr bgColor='blue.500'
                    color='white'
                    >
                        <Th 
                        border="1px"
                        >
                            Image
                        </Th>
                        <Th
                        border="1px"
                        >
                            Title
                        </Th>
                        <Th
                        border="1px">
                            Price
                        </Th>
                        <Th
                        border="1px"
                        >
                            Actions
                        </Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            products && products.map((item, i)=>(
                                <Tr  key={i}>
                                    <Td border="1px">
                                        <Image 
                                        w="80px"
                                        h="80px"
                                        src={item.image} />
                                    </Td>
                                    <Td border="1px">{item.title}</Td>
                                    <Td border="1px">Rs. {item.price}</Td>
                                    <Td border="1px" >
                                        <span 
                                        onClick={()=>handleModal('updateModal', item._id)}
                                        style={{cursor:"pointer", padding: "0px 5px"}}>Edit</span> 
                                        <span 
                                        onClick={()=>handleDelete(item._id)}
                                        style={{cursor:"pointer", padding: "0px 5px", "borderLeft": "1px solid"}}>Delete</span>
                                    </Td>
                                </Tr>
                            ))
                        }
                    
                    
                    
                    </Tbody>
               
                </Table>
            </TableContainer>

            {/* update product */}
            <UpdateProductModal id={productId} categories={categories} isOpen={view =='updateModal' && isOpen} onClose={onClose} />
            <AddProductModal  categories={categories} isOpen={view =='addModal' && isOpen} onClose={onClose} />
            

            
            

        </Box>
    )
}