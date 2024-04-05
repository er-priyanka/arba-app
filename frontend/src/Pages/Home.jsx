import { Carousel } from "../Components/Carousel";
import { Navbar } from "../Components/Navbar"
import { Box } from "@chakra-ui/react";
import { Products } from "../Components/Products";
import { useEffect, useState } from "react";
import { AllRoutes } from "./AllRoutes";
import { Dashboard } from "../Components/Dashboard";



export const Home = () => {
    
    return (
        <Box>
            {/* <Navbar /> */}
            <Dashboard />
           
           
        </Box>
    )
}