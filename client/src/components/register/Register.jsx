import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';


const initialData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''

}


const Register = (props) => {

    const dir = props.dir;
    const [formulario, setFormulario] = useState(initialData);
    const navigate = useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const send = e => {
        e.preventDefault();
        axios.post("/api/"+dir+"usuario", formulario)
            .then(resp => {
                if(!resp.data.error) {
                    alert('Usuario registrado exitosamente');
                    navigate('/login')
                } else {
                    alert('Ha ocurrido un error')
                }
            })
    }

    return(
        <React.Fragment>
            <Form className="FormRegister" onSubmit={send}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Nombre
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='nombre' 
                            type="text" 
                            required
                            value={formulario.nombre}
                            placeholder="nombre" 
                            onChange={updateForm} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Apellido
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='apellido' 
                            type="text" 
                            required
                            value={formulario.apellido}
                            placeholder="apellido" 
                            onChange={updateForm} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Email
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='email' 
                            type="email" 
                            required
                            value={formulario.email} 
                            placeholder="example@example.com" 
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Confirme contraseña
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            name='confirmPassword' 
                            type="password" 
                            minLength={3}
                            value={formulario.confirmPassword}
                            placeholder="Confirm password" 
                            onChange={updateForm} />
                    </Col>
                </Form.Group>
                <Button type='submit'>Register</Button>
            </Form>
            <Link to="/">Volver</Link>
            <Link to={'/login'}>Ingresar</Link>
        </React.Fragment>
    )
}

export default Register;