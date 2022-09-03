import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Main';
import { useState } from 'react';
import Update from './components/Update';
import PetForm from './components/PetForm';
import PetListDel from './components/PetListDel';
import UserContext from './components/contextos/user-context';
import Login from './components/register/Login';
import Register from './components/register/Register';


function App() {
    // CAMBIAR SEGÚN PROYECTO!!!
    // En componentes sin ruta, actualizar a mano
  const dir = 'pets/';

  // CAMBIAR SEGÚN PROYECTO!!!
  const [allPets, setAllPets] = useState([]);

  const [usuario,setUsuario] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider  value={{usuario, setUsuario}}>
        <div className="App">
            <Routes>

              <Route path='/login' 
                element={<Login dir={dir} />}></Route>
              
              <Route path='/usuario' 
                element={<Register dir={dir} />}></Route>

              <Route path="/*" 
                element={
                <Main allPets={allPets} 
                setAllPets={setAllPets}
                dir={dir} />} />
              
              <Route path='/pets/:id' 
                element={
                <PetListDel allPets={allPets} 
                setAllPets={setAllPets} 
                dir={dir} />}></Route>

              <Route path='/pets/update/:id' 
                element={
                <Update allPets={allPets} 
                setAllPets={setAllPets} 
                dir={dir} />}></Route>

              <Route path='/pets/new' 
                element={
                <PetForm allPets={allPets} 
                setAllPets={setAllPets} 
                dir={dir} />}></Route>

            </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
