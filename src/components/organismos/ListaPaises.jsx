import styled from "styled-components";
import { v, InputBuscadorLista, ConvertirCapitalize, Device, BtnCerrar } from "../../index";
import iso from "iso-country-currency"
import { useState } from "react";
export function ListaPaises({ setSelect, setState }) {
  // currency library
  const isocodigos = iso.getAllISOCodes();
  // currency selected by user
  const [dataresult, setDataresult] = useState([]);
  /**
   * sets the selected currency by the user
   * @param {Object} p    currency object selected by the user
   */
  function seleccionar(p) {
    setSelect(p)
    setState();
  }
  /**
   * searchs for a currency that belongs to certain countryname
   * @param {Event} e    event with text inputed by the user
   */
  function buscar(e) {
    // filters currencies looging for a match with a country name
    let filtrado = isocodigos.filter((item) => {
      return item.countryName == ConvertirCapitalize(e.target.value)
    });
    // sets results
    setDataresult(filtrado);
  }
  return (
    <Container>
      <header className="header">
        <span>busca tu pais</span>
        <BtnCerrar funcion={setState}/>
      </header>
      <InputBuscadorLista
        onChange={buscar}
        placeholder="Buscar..." />
      {
        dataresult.length > 0 &&
        dataresult.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => seleccionar(item)}>
              <span>{item.countryName}</span>
              <span>{item.symbol}</span>
            </ItemContainer>
          );
        })
      }
    </Container>
  );
}
const Container = styled.div`
  margin-top: 10px;
  position: absolute;
  top: 88%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 10px;
  border: 3px solid #3a3a3a;
  padding: 10px;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  z-index:3;
  @media ${() => ()=>Device.tablet} {
    width: 400px;
  }


  
  .header{
    display: flex;
    align-items:center;
    justify-content:space-between;
    background-color: inherit;

  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;