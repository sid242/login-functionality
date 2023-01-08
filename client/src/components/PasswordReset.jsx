import React, { useState } from 'react'
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

const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (!email.includes("@")) {
            alert("Enter valid email!")
        } else {
            try {
                let data = JSON.stringify({ email });
                const res = await axios.post("http://3.139.238.162:3500/api/auth/sendpasswordlink",
                    data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const response = await res.data;

                if (response.status == 201) {
                    setEmail("");
                    setMessage(true)
                } else {
                    alert("Invalid User")
                }

            } catch (error) {
                console.log("Error", error)
                alert("Invalid User")
            }
        }
    }

    return (
        <>

            <Container>
                <Wrapper>
                    <Title>Generate Link</Title>
                    <Form onSubmit={sendLink}>
                        <InputContainer>
                            <Label>Email</Label>
                            <Input
                                type="text"
                                placeholder="Enter your email"
                                value={email} onChange={setVal}
                                name="email"
                                id="email"
                            />
                        </InputContainer>

                        <Button>Get Link</Button>
                    </Form>
                    {message ? <Span style={{ color: "green", fontWeight: "bold" }}>Pasword reset link send Succsfully in Your Email</Span> : ""}
                </Wrapper>
            </Container>

        </>
    )
}

export default PasswordReset