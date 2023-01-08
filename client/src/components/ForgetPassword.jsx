import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import styled from "styled-components"
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
  height: 250px;
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


const ForgetPassword = () => {

    const { id, token } = useParams();

    const navigate = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await axios.get(`/forgotpassword/${id}/${token}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.data;

        if (data.status == 201) {
            console.log("user valid")
        } else {
            navigate("/")
            // alert("Generate Link again")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();
        console.log("reset")
        try {
            let data = JSON.stringify({ password });
            const res = await axios.post(`http://localhost:3500/api/auth/${id}/${token}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },

                });

            const response = await res.data;
            if (response.status == 201) {
                setPassword("")
                setMessage(true)
            }
        } catch (error) {
            console.log("error", error)
            alert("Token Expired, generate link again!")
        }


    }

    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData(true)
        }, 3000)
    }, [])

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>Generate New PassWord</Title>
                    <Form onSubmit={sendpassword}>
                        <InputContainer>
                            <Label>Password</Label>
                            <Input
                                type="text"
                                placeholder="Enter password"
                                value={password} onChange={setval}
                                name="password"
                                id="password"
                                required
                                minLength={5}
                            />
                        </InputContainer>
                        <Button>Update Password</Button>
                    </Form>
                    <Span>{message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}</Span>
                    <Span><NavLink to="/">Go back to Login</NavLink></Span>
                </Wrapper>
            </Container>
        </>
    )
}

export default ForgetPassword