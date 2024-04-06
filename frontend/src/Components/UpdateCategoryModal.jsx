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

const getCategoryById = async (id)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/category/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await res.json();
    return data;
}


const updateCategory = async(category, id)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`https://arba-backend-2-0j6p.onrender.com/category/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(category)
    });

    const data = await res.json();
    return data;

}

export const UpdateCategoryModal = ({id, isOpen, onClose})=>{
    const [category,setCategory] = useState(iniState);
    const toast = useToast();


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCategory({...category, [name]:value});
    }

    const handleUpdate = (data, id)=>{
        updateCategory(data, id).then(res=>{
            toast({
                title: 'Category is updated successfully',
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

        // setCategory(iniState);
        onClose();
    }

    useEffect(()=>{
        getCategoryById(id).then(res=>{
            setCategory(res);
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }, [id])

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Update Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
                <Input name="name" 
                placeholder="Name"
                value={category.name} 
                onChange={handleChange} />

                <Input name="slug" 
                placeholder="Slug"
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
                <Button variant='ghost' onClick={()=>handleUpdate(category, id)}>Update</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}