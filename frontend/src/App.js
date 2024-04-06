import logo from './logo.svg';
import './App.css';
import { AllRoutes } from './Pages/AllRoutes';
import { Navbar } from './Components/Navbar';
import { useEffect, useState } from 'react';


function App() {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    const getToken = localStorage.getItem('token');
    setToken(getToken);
  }, [token])
  
  return (
    <div className="App">
      {token && <Navbar />}
      <AllRoutes />
    </div>
  );
}

export default App;
