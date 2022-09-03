import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ImPencil2 } from 'react-icons/im';


const InitialData = {
    name: '',
    type: '',
    description: '',
    skillOne: '',
    skillTwo: '',
    skillThree: ''
};

const Update = (props) => {

    const {id} = useParams();

    const [formulario, setFormulario] =useState(InitialData);

    useEffect(()=>{
        axios.get('/api/'+props.dir+id)
        .then(res=>{
            setFormulario(res.data.justOne)
        })
        .then(console.log(formulario))
    },[])

    const navigate=useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("/api/"+props.dir+id,
            formulario)
            .then(res=>{
                // DEFINIR VALIDACION FRONTEND!!!!!
                // COMPARAR CON BACKEND
                console.log(res);
                if(formulario.name.toString().length<3&&formulario.type.toString().length<3&&formulario.description.toString().length<3){
                    console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet type is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
                } else if(formulario.name.toString().length<3&&formulario.type.toString().length<3) {
                    console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet type is required, minimum 3 characters`))
                } else if(formulario.name.toString().length<3&&formulario.description.toString().length<3) {
                    console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
                } else if(formulario.type.toString().length<3&&formulario.description.toString().length<3) {
                    console.log(Swal.fire(`Pet type is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
                } else if(formulario.name.toString().length<3){
                    console.log(Swal.fire('Pet name is required, minimum 3 characters'))
                } else if(formulario.type.toString().length<3){
                    console.log(Swal.fire('Pet type is required, minimum 3 characters'))
                } else if(formulario.description.toString().length<3){
                    console.log(Swal.fire('Pet description is required, minimum 3 characters'))
                } else {
                    Swal.fire(`Pet added successfully`);
                    navigate('/')
                }
            })
            .then(ud=>{console.log(ud);
        })
    }

    return(
        <React.Fragment>

            <div style={{width: '40rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                    <h1>Pet Shelter</h1>
                    <p>Edit {formulario.name} </p>
                </div>
                <div>
                    <a href='/' >back to home</a>

                </div>
            </div>

            <Container className='contenedor'>

                
                <Row>
                    <Form onSubmit={handleSubmit}>

                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{width: '49%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet name: 
                                    </Form.Label>
                                        <Form.Control style={{width: '80%', marginLeft: '10px'}}
                                            type="text" 
                                            name ="name"
                                            value = {formulario.name} 
                                            defaultValue = {formulario.name} 
                                            placeholder="Project title" 
                                            onChange={updateForm} />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet type: 
                                    </Form.Label>
                                        <Form.Control style={{width: '80%', marginLeft: '10px'}}
                                            type="text" 
                                            name="type" 
                                            value={formulario.type}
                                            dedfaultValue={formulario.type}
                                            onChange={updateForm} />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet description: 
                                    </Form.Label>
                                        <Form.Control style={{width: '80%', marginLeft: '10px'}}
                                            type="text" 
                                            name="description" 
                                            value={formulario.description}
                                            defaultValue={formulario.description}
                                            onChange={updateForm} />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{width: '80%', justifySelf: 'center', marginTop: '20px'}}>
                                    <ImPencil2/> Edit pet
                                </Button>
                            </div>

                            <div style={{width: '49%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                <p>Skills (optional)</p>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 1: 
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="skillOne" 
                                        value={formulario.skillOne}
                                        defaultValue={formulario.skillOne}
                                        onChange={updateForm} />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 2: 
                                    </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="skillTwo" 
                                            value={formulario.skillTwo}
                                            defaultValue={formulario.skillTwo}
                                            onChange={updateForm} />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 3:
                                    </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="skillThree" 
                                            value={formulario.skillThree}
                                            defaultValue={formulario.skillThree}
                                            onChange={updateForm} />
                                </Form.Group>

                            </div>
                        </div>

                        <Row>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Update;