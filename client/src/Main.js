import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import UserContext from "./components/contextos/user-context";


const Main = (props) => {
    
    const compareDate = (a,b) => {
        if (a.type<b.type) {
            return -1
        } if (a>b){
            return 1
        }
        return 0
    }
    const [pets] = [props.allPets.sort((a,b)=> compareDate(a,b)),props.setAllPets];

    const navigate = useNavigate();
    // const [usuario,setUsuario] = useState();
    const context = useContext(UserContext)


    useEffect(()=> {
        if(!context.usuario){
        if(sessionStorage.getItem('USUARIO')){
            context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
        }
        else {
          navigate('/login');
        }
        } 
        else {
        sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
        }
    }
    , [])

    useEffect(() => {
        axios.get("/api/pets/all")
            .then(res=>{
                props.setAllPets(res.data.all);
                console.log(props.allPets);
            })
            .catch(err=>console.log("Error: "+{err}))
        },[])

    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    }

    // const goToUpdate = (e) => {
    //     navigate('/'+props.dir+'update/'+e._id)
    // }

    // const goToList = (e) => {
    //     navigate('/'+props.dir+e._id)
    // }

    return(
        <React.Fragment>
            <div style={{width: '40rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                    <h1>Pet Shelter</h1>
                    <p>These pets are looking for a good home</p>
                </div>
                <div>
                    <a href={'/'+props.dir+'new'}>add a pet to the shelter</a>
                </div>
            </div>

            <table style={{width: '40rem'}}>
                <thead style={{background: 'gray',border: '2px solid black'}}>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody style={{border: '2px solid black'}}>

                {pets.map((itm,idx)=> {
                    if(idx%2==0){
                        return(
                            <tr key={idx} style={{background:'#D1D1D1'}}>
                                <td>
                                    {itm.name}
                                </td>
                                <td style={{width: '40%'}}>
                                    {itm.type}
                                </td>
                                <td style={{width: '20%'}}>
                                    <a href={props.dir+itm._id}>details</a> |
                                    <a href={props.dir+'update/'+itm._id}>edit</a>
                                </td>
                            </tr>
                        )

                    } else {
                        return(
                            <tr key={idx}>
                                <td>
                                    {itm.name}
                                </td>
                                <td style={{width: '40%'}}>
                                    {itm.type}
                                </td>
                                <td style={{width: '20%'}}>
                                    <a href={props.dir+itm._id}>details</a> |
                                    <a href={props.dir+'update/'+itm._id}>edit</a>
                                </td>
                            </tr>
                        )
                    }
                })}

                </tbody>
            </table>
            
            <Button className='btn btn-danger' onClick={salir}>Salir</Button>
            
        </React.Fragment>
    )
}

export default Main;