import React, { useState } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #a8394c;
`
const Wrapper = styled.div`
  width: 400px;
  height: 430px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  margin: 10px;
`
const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
`
const Form = styled.form`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const InputContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
 font-size: 14px;
 margin-left: 10px;
 color:grey;
`
const Input = styled.input`
  margin: 5px;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  font-size: 20px;
  border-radius: 10px;
  border: 2px solid black;
  padding: 0px 10px;
  font-size:14px;
 
`
const Button = styled.button`
  margin: 5px;
  margin-left: 11px;
  width: 80%;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  background:black;
  color:white;
  border: none;
  cursor: pointer;
`
const Span = styled.span`
text-align: center;
margin-bottom: 15px;
`
const Register = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password === credentials.cpassword) {
            const { name, email, password } = credentials
            let data = JSON.stringify({ name, email, password })
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createuser`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    });
                const json = await response.data;
                localStorage.setItem('userInfo', JSON.stringify(json))
                // console.log(json);
                if (json.success) {
                    localStorage.setItem('token', json.authtoken);
                    navigate("/user");
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Re enter the password")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Wrapper>
                <Title>Register</Title>
                <Form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label>Full name</Label>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            onChange={onChange}
                            id="name"
                            name="name"
                            required
                            minLength={3}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            placeholder="Enter email"
                            onChange={onChange}
                            id="email"
                            name='email'
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            onChange={onChange}
                            id="password"
                            name='password'
                            minLength={5}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Confirm Password</Label>
                        <Input
                            type="text"
                            placeholder="Enter confirm password"
                            onChange={onChange}
                            id="cpassword"
                            name='cpassword'
                            required
                        />
                    </InputContainer>
                    <Button>Sign Up</Button>
                </Form>
                <Span>Already have an account? <Link to='/login'>Login</Link></Span>
            </Wrapper>
        </Container>
    )
}

export default Register
