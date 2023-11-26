import styled from "styled-components";
import { BtnCerrar, Device, v } from "../../index"; //! unused import
export function ListaGenerica({data, setState, funcion}) {
  /**
   * sets the selected object with given setter function and hides select options
   * @param {Object} p   object selected by the user
   */
  function seleccionar(p) {
    // set object
    funcion(p);
    // hide select options
    setState();
  }
  return (
    <Container>
      <section className="contentClose">
        <BtnCerrar funcion={setState}/>
      </section>
      <section className="contentItems">
        {data.map((item,index)=>{
          return(<ItemContainer key={index} onClick={()=> seleccionar(item)}>
            <span>{item.icono}</span>
            <span>{item.descripcion}</span>
          </ItemContainer>)
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: 35%;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index:3;
  @media ${() => Device.tablet} {
    width: 400px;
  }
`;
const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({theme})=>theme.bgtotal};
  }
`;