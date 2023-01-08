import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import styled from "styled-components"
import UserTable from './UserTable';

const Container = styled.div`
padding: 10px 70px;
`
const LogoutBtn = styled.button`
margin: 0px 20px;
  color: white;
  background-color: blue;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid blue;
  border-radius: 3px;
  &:hover {
  color: blue;
  background-color: white;
}
`
const Header = styled.header`
display:flex;
margin: 5px 10px; 
justify-content: space-between; align-items: center;
`
const LeftDiv = styled.div``
const TextHeading = styled.h2``
const RightDiv = styled.div``

const NameSpan = styled.span`
margin-right:15px;
`
const Info = styled.div`
margin: 10px 6px;
`
const Span = styled.span``
const FilterContainer = styled.div``

const SearchInput = styled.input`
  margin: 5px;
  width: 50%;
  height: 30px;
  padding-left: 5px;
  font-size: 20px;
  border-radius: 7px;
  border: none;
  outline:none;
  padding: 0px 10px;
  font-size:14px;
  background-color: #ededed;
`
const FilterButton = styled.button`
  margin-left: 10px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  background:white;
  cursor: pointer;
  padding: 0px 15px;
  font-weight:bold;
  color:black;

  `

const User = () => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [filterValue, setFilterValue] = useState("");


    const [random, setRandom] = useState(0)
    let navigate = useNavigate();

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = pageNumber => setCurrentPage(pageNumber);



    const loadUserData = async () => {
        try {
            const users = await axios.get('https://dummyjson.com/users');
            setUserData(users.data.users)
            /* console.log("userData", users.data.users) */
            const filteredU = await axios.get('https://dummyjson.com/users');
            /* console.log("filteredU", filteredU.data) */
        } catch (error) {
            console.log("loadUserData", error)
        }
    }

    useEffect(() => {
        loadUserData();
        console.log("userData", userData)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        navigate('/login')
    }


    const handleFilter = () => {
        if (filterValue.length > 0) {
            var filderdata = userData.filter(items => {
                return items.firstName.toLowerCase().includes(filterValue.toLowerCase()) || items.lastName.toLowerCase().includes(filterValue.toLowerCase())
            })
            setUserData(filderdata)
            console.log('filderdata', filderdata);
            setRandom(random + 1)
        }
        else {
            console.log(filderdata, "filderdata");
            loadUserData()
        }

    }

    return (
        <Container className='user_dashboard'>
            <Header>
                <LeftDiv className="left">
                    <TextHeading>Users</TextHeading>
                </LeftDiv>
                <RightDiv className="right" >
                    <NameSpan>{JSON.parse(localStorage.getItem("userInfo")).data.user.name}</NameSpan>|
                    <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
                </RightDiv>
            </Header>

            <FilterContainer>
                <SearchInput type="text" value={filterValue} onChange={(e) => { setFilterValue(e.target.value) }} placeholder='Search User By Name' />
                <FilterButton onClick={handleFilter}><img src='https://cdn-icons-png.flaticon.com/512/107/107799.png' width='16px' style={{ color: "white", position: "relative", top: "2px" }} />  Filter</FilterButton>
            </FilterContainer>

            <Info>
                <Span style={{ fontWeight: "bold" }}>{userData.length}, Users </Span>
                <Span>Show 10 Entries</Span>
            </Info>
            <UserTable userData={userData} currentUsers={currentUsers} indexOfFirstUser={indexOfFirstUser} setRandom={setRandom} random={random} setUserData={setUserData} />

            <Pagination
                style={{ marginLeft: "20px", display: "flex" }}
                usersPerPage={usersPerPage}
                totalUsers={userData.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </Container>
    )
}

export default User;
