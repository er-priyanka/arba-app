import { Carousel } from "../Components/Carousel";
import { Box, useDisclosure  } from "@chakra-ui/react";
import { Products } from "../Components/Products";
import { useEffect, useState } from "react";
import { TCModal } from "./TCModal";
import { useNavigate} from "react-router-dom";


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

export const acceptTC = ()=>{
    localStorage.setItem('termsConditions', "accepted");
}

export const Dashboard = () =>{
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTC = ()=>{
    acceptTC();
    onClose();
  }  

    useEffect(()=>{
        
        const getToken = localStorage.getItem('token');
        setToken(getToken);
        // console.log(getToken);
        
        // navigate('/login')
        if(!getToken){
            navigate('/login');
        }
          
  
          
        const data = getProducts();
        data.then(res=>{
            // console.log(res);
            setProducts((res.length > 8) ? res.slice(0, 8): res);
        }).catch(err=>{
            console.log(err);
        });

        const tc = localStorage.getItem('termsConditions');

        if(!tc)
            onOpen();
        
    }, [products, token])

    return (
        <Box>
            {/* <Carousel /> */}
            <Products products={products} />
            <TCModal handleTC={handleTC} isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}