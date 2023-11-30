import styled from "styled-components";
import { ActionsTable } from "../../../index";
import { v } from "../../../styles/variables";
export function ContentActionsTable({funcEdit, funcEliminate}) {
  return (
    <Container>
      { funcEdit && <ActionsTable func = {funcEdit} fontSize="18px" color="#7d7d7d" icon={<v.iconeditTable/>} /> }
      <ActionsTable func={funcEliminate} fontSize="20px" color="#f76e8e" icon={<v.iconeliminateTable/>} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  gap:10px;
  @media (max-width: 48em) {
    justify-content:end;
  }
`;