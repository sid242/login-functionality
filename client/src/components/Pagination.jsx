import React from 'react';
import styled from "styled-components"

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const PageNumContainer = styled.ul`
display: flex;
  justify-content: space-between;
  list-style-type: none;
  min-width: 10%;`

const PageNum = styled.li`
&:hover {
  color: white !important;
  background-color: blue;
}
`
const PaginationBtn = styled.button`
margin: 0px 20px;
  color: white;
  background-color: blue;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid blue;
  border-radius: 3px;
  &:hover {
  color: blue;
  background-color: white;
}
&:disabled {
  cursor: unset;
  color: white;
  background-color: blue;
}
`

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <PaginationBtn onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} >Prev</PaginationBtn>
      <PageNumContainer>
        {pageNumbers.map(number => (
          <PageNum className='pageNum' onClick={() => paginate(number)} key={number} style={(currentPage === number) ? {
            color: "white",
            backgroundColor: "blue",
            padding: "5px 10px",
            cursor: "pointer",
            border: '1px solid blue',
          } : {
            border: '1px solid blue',
            color: 'blue',
            padding: "5px 10px",
            cursor: "pointer"
          }
          } >
            <span>
              {number}
            </span>
          </PageNum>
        ))}
      </PageNumContainer>
      <PaginationBtn onClick={() => paginate(currentPage + 1)} disabled={currentPage == pageNumbers.length} className='paginationBtn'>Next</PaginationBtn>
    </Container >
  );
}

export default Pagination
