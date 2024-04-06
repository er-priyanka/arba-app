import {
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    ModalFooter,
    Input,
    useToast,
    Select
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const iniState = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: ""
}

const getProductById = async (id)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await res.json();
    return data;
}


const updateProduct = async(product, id)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/product/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(product)
    });

    const data = await res.json();
    return data;

}

export const UpdateProductModal = ({categories, id, isOpen, onClose})=>{
    const [product,setProduct] = useState(iniState);
    const toast = useToast();


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setProduct({...product, [name]:value});
    }

    const handleUpdate = (data, id)=>{
        updateProduct(data, id).then(res=>{
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
        });

        // setProduct(iniState);
        onClose();
    }

    useEffect(()=>{
        getProductById(id).then(res=>{
            setProduct(res);
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }, [id])

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
                <Input name="title" 
                placeholder="Title"
                value={product.title} 
                onChange={handleChange} />

                <Input name="description" 
                placeholder="Description"
                mt="10px"
                value={product.description} 
                onChange={handleChange} />

                <Input name="price" 
                placeholder="price"
                mt="10px"
                value={product.price} 
                onChange={handleChange} />

                <Select name="category" >
                 {
                    (categories.length !== 0) ? categories.map((item, i)=>(
                        <option key={i} value={item._id}>{item.name}</option>
                    ))
                    : (<option value={product.category}>{product.category}</option>)
                 }
                
                </Select>
                

                <Input name="image" 
                placeholder="Enter Image Url"
                mt="10px"
                value={product.image} 
                onChange={handleChange} />

                    
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='ghost' onClick={()=>handleUpdate(product, id)}>Update</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}