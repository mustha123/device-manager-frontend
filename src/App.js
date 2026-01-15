import logo from './logo.svg';
import './App.css';
import Userrouter from './Modules/User/Usrouter/Userrouter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adminrouter from './Modules/Admin/Adrouter/Adminrouter';
import CartProvider from "./context/CartProvider";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
         <CartProvider>

      <Routes>
        <Route path='/admin/*' element={<Adminrouter/>}/>
        <Route path='/*' element={<Userrouter/>}/>
      </Routes>
          </CartProvider>

     </BrowserRouter>
    </div>
  );
}

export default App;
