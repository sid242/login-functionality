import React, { useState } from 'react'
import styled from "styled-components"

const TableContainer = styled.div`
overflow-x:auto;
`
const TableFormat = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
`
const TableHead = styled.thead``
const TableBody = styled.tbody``
const TableRow = styled.tr``
const ColumnHeading = styled.th``
const RowDetails = styled.td``
const Loader = styled.div`
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`

const UserTable = ({ userData, currentUsers, setUserData, random, setRandom, indexOfFirstUser, loading, filterData, setFilterData }) => {
    const [asc, setasc] = useState(false);
    const [ascDate, setAscDate] = useState(false);

    function acendingOrder() {
        console.log("age", userData)

        if (!asc) {
            setFilterData(filterData.sort(function (a, b) {
                return a.age - b.age
            }))
            setRandom(random + 1)
            setasc(true)
        } else {
            setFilterData(filterData.reverse())
            setRandom(random + 1)
            setasc(false)
        }
    }
    function acendingDate() {
        console.log("date", ascDate);
        if (!ascDate) {
            var dateInMili = filterData.filter(items => {
                let month = new Date(items.birthDate).getMonth() + 1
                if (month < 10) {
                    month = "0" + month
                }
                let date;
                if (new Date(items.birthDate).getDate() < 10) {
                    date = "0" + new Date(items.birthDate).getDate()
                } else {
                    date = new Date(items.birthDate).getDate()
                }
                return items.birthDate = new Date(items.birthDate).getFullYear() + "-" + month + "-" + date
            }).sort(function (a, b) {
                return a.birthDate - b.birthDate
            }).filter(items => {
                let month1 = new Date(items.birthDate).getMonth() + 1
                if (month1 < 10) {
                    month1 = "0" + month1
                }
                let date1;
                if (new Date(items.birthDate).getDate() < 10) {
                    date1 = "0" + new Date(items.birthDate).getDate()
                } else {
                    date1 = new Date(items.birthDate).getDate()
                }
                return items.birthDate = new Date(items.birthDate).getFullYear() + "-" + month1 + "-" + date1
            })
            // console.log(dateInMili);
            setFilterData(dateInMili)
            setRandom(random + 1)
            setAscDate(true)
        } else {
            dateInMili = filterData.filter(items => {
                let month = new Date(items.birthDate).getMonth() + 1
                let date;
                if (month < 10) {
                    month = "0" + month
                }
                if (new Date(items.birthDate).getDate() < 10) {
                    date = "0" + new Date(items.birthDate).getDate()
                } else {
                    date = new Date(items.birthDate).getDate()
                }

                return items.birthDate = new Date(items.birthDate).getFullYear() + "-" + month + "-" + date
            }).sort(function (a, b) {
                return a.birthDate - b.birthDate
            }).filter(items => {
                let month1 = new Date(items.birthDate).getMonth() + 1
                if (month1 < 10) {
                    month1 = "0" + month1
                }
                let date1;
                if (new Date(items.birthDate).getDate() < 10) {
                    date1 = "0" + new Date(items.birthDate).getDate()
                } else {
                    date1 = new Date(items.birthDate).getDate()
                }
                return items.birthDate = new Date(items.birthDate).getFullYear() + "-" + month1 + "-" + date1
            })

            // console.log(dateInMili);

            setFilterData(dateInMili.reverse())
            setRandom(random + 1)
            setAscDate(false)
        }
    }
    return (

        <TableContainer>
            <TableFormat>
                <TableHead>
                    <TableRow>
                        <ColumnHeading>No.</ColumnHeading>
                        <ColumnHeading>User Name</ColumnHeading>
                        <ColumnHeading>Mobile Number</ColumnHeading>
                        <ColumnHeading>Email</ColumnHeading>
                        <ColumnHeading>Age <button style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",

                        }} onClick={() => acendingOrder()}><img src="https://www.pngfind.com/pngs/b/495-4952598_sort-icon-png.png" width="16px" /></button> </ColumnHeading>
                        <ColumnHeading>Register Date <button style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }} onClick={() => acendingDate()}><img src="https://www.pngfind.com/pngs/b/495-4952598_sort-icon-png.png" width="16px" /></button></ColumnHeading>
                    </TableRow>
                </TableHead>
                {loading ? <Loader>Loading...</Loader> : <TableBody>
                    {currentUsers.map((i, index) =>
                        <TableRow key={i.id}>
                            <RowDetails>{index + indexOfFirstUser + 1}</RowDetails>
                            <RowDetails ><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><span style={{ display: "inline-block" }}><img src={i.image} style={{
                                objectFit: "cover",
                                width: "35px",
                                height: "35px",
                                background: "rgb(229 224 224 / 50%)",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }} /></span><span>{i.firstName} {i.lastName}</span></div></RowDetails>
                            <RowDetails>{i.email}</RowDetails>
                            <RowDetails>{i.phone}</RowDetails>
                            <RowDetails >{i.age}</RowDetails>
                            <RowDetails>{i.birthDate}</RowDetails>
                        </TableRow>
                    )}
                </TableBody>}
            </TableFormat>
        </TableContainer>
    )
}

export default UserTable
