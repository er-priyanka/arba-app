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
    name: "",
    slug: "",
    image: ""
}


const addCategory = async(category)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(category)
    });

    const data = await res.json();
    return data;

}

export const AddCategoryModal = ({isOpen, onClose})=>{
    const [category, setCategory] = useState(iniState);
    const toast = useToast();


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCategory({...category, [name]:value});
    }

    const handleAdd = (data)=>{
        addCategory(data).then(res=>{
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
    }

    // useEffect(()=>{
    //     // getProductById(id).then(res=>{
    //     //     setProduct(res);
    //     //     console.log(res);
    //     // }).catch(err=>{
    //     //     console.log(err);
    //     // })
    // }, [category])

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
                <Input name="name" 
                placeholder="name"
                value={category.name} 
                onChange={handleChange} />

                <Input name="slug" 
                placeholder="slug"
                mt="10px"
                value={category.slug} 
                onChange={handleChange} />

                <Input name="image" 
                placeholder="Enter Image Url"
                mt="10px"
                value={category.image} 
                onChange={handleChange} />

                    
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='ghost' onClick={()=>handleAdd(category)}>Add</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}