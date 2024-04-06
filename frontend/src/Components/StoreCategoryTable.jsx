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
import { UpdateCategoryModal } from "./UpdateCategoryModal";
import { getData } from "../Pages/MyStore";
import { AddCategoryModal } from "./AddCategory";



const buttonStyleProps = {
    variant: 'unstyled',
    bgColor: "blue.500",
    color:"white",
    borderRadius: "0",
    padding: "5px 15px",

}



const deleteCategory = async (id) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
       
    });

    const data = await res.json();
    return data;
}




export const StoreCategoryTable = ({data})=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [view, setView] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategories] = useState(data);
    const toast = useToast();



    const handleModal = (val, id)=>{
        setView(val);
        setCategoryId(id);
        onOpen();
    }

    const handleRefresh = ()=>{
        const getCategory = getData("category");
        getCategory.then(res=>{
            console.log('category',res);
            setCategories(res);
        }).catch(err=>{
            console.log(err);
        });
    }


    

    const handleDelete = (id)=>{
        deleteCategory(id).then(res=>{
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

    useEffect(()=>{
        const getCategories = getData("category");
        getCategories.then(res=>{
            // console.log('category' , res);
            setCategories(res);
        }).catch(err=>{
            console.log(err);
        })
    }, [category])

    
    // console.log(data);

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
                            Name
                        </Th>
                        <Th
                        border="1px">
                            Slug
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
                            category && category.map((item, i)=>(
                                <Tr  key={i}>
                                    <Td border="1px">
                                        <Image 
                                        w="80px"
                                        h="80px"
                                        src={item.image} />
                                    </Td>
                                    <Td border="1px">{item.name}</Td>
                                    <Td border="1px">{item.slug}</Td>
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
            <UpdateCategoryModal id={categoryId}  isOpen={view =='updateModal' && isOpen} onClose={onClose} />
            <AddCategoryModal  isOpen={view =='addModal' && isOpen} onClose={onClose} />
            

            
            

        </Box>
    )
}