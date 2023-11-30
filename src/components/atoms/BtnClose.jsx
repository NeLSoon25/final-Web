import styled from "styled-components";
import { v } from "../../index"
//! shouldn't this button be at molecules?
export function BtnClose({func}){
  return(
    <Container onClick={func}>
      {<v.iconclose/>}
    </Container>
  );
}
const Container = styled.span`
  cursor: pointer;
  font-size:25px;
  transition:all 0.2s;
  &:hover{
    color: #BF94FF;
    transform:scale(1.2);
  }
`
