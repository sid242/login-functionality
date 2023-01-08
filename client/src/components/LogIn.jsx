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
  height: 330px;
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
const Fspan = styled.span`
margin: 5px 0px 5px 170px;
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

const LogIn = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = JSON.stringify({ email: credentials.email, password: credentials.password })
            const response = await axios.post("http://3.139.238.162:3500/api/auth/login",
                data, {
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            const json = await response.data;
            console.log(json);
            localStorage.setItem('userInfo', JSON.stringify(json))

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                console.log("LoggedIn")
                navigate("/user");
            }
            else {
                alert("Invalid credentials");
            }
        } catch (e) {
            alert("Invalid credentials");
            console.log("Error", e)
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Wrapper>
                <Title>Log in</Title>
                <Form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            placeholder="Enter email"
                            value={credentials.email}
                            onChange={onChange}
                            id="email"
                            name="email"
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={credentials.password}
                            onChange={onChange}
                            name="password"
                            id="password"
                            required
                        />
                    </InputContainer>
                    <Fspan><Link to='/password-reset' style={{ cursor: "pointer" }}>Forget password?</Link></Fspan>
                    <Button>Login</Button>
                </Form>
                <Span>Do you have an account? <Link to='/register'>Register</Link></Span>
            </Wrapper>
        </Container>
    )
}

export default LogIn
