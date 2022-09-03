import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import UserContext from "../contextos/user-context";
import { Link, useNavigate } from 'react-router-dom';


const initialData = {
    username: '',
    password: '',
}


const Login = (props) => {

    const dir = props.dir;
    const [formulario, setFormulario] = useState(initialData);
    const context = useContext(UserContext)
    const navigate = useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const login = e => {
        e.preventDefault();
        axios.post("/api/"+dir+"login", formulario)
            .then(resp => {
                if(!resp.data.error) {
                    context.setUsuario(resp.data.datos);
                    sessionStorage.setItem('USUARIO', JSON.stringify(resp.data.datos));
                    navigate('/');
                } else {
                    alert('Error en Login: '+resp.msg)
                }
            })
    }

    return(
        <React.Fragment>
            <Form className="FormRegister" onSubmit={login}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Email
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='username' 
                            type="username" 
                            required
                            value={formulario.username} 
                            placeholder="username" 
                            onChange={updateForm} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Contraseña
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='password' 
                            type="password" 
                            minLength={3}
                            value={formulario.password} 
                            placeholder="password" 
                            onChange={updateForm} />
                    </Col>
                </Form.Group>
                <Button type='submit'>Login</Button>
            </Form>
            <Link to="/">Volver</Link>
            <Link to="/usuario">Registrarse</Link>
        </React.Fragment>
    )
}

export default Login;