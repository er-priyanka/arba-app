import logo from './logo.svg';
import './App.css';
import { AllRoutes } from './Pages/AllRoutes';
import { Navbar } from './Components/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

const getToken = localStorage.getItem('token');

function App() {
  const [token, setToken] = useState(null);

  console.log(getToken);

  useEffect(()=>{
    const getToken = localStorage.getItem('token');
    setToken(getToken);
    // console.log(getToken);

    
  }, [token])
  
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
