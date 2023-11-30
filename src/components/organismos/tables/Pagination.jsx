import React, { useState } from "react";
import { v } from "../../../styles/variables";
import styled from "styled-components";
import { useOperaciones } from "../../../index";
export const Pagination = ({ page, setPage, max }) => {
  // text color and background colors used
  const { bgCategory, colorCategory } = useOperaciones();
  // variable used to display page number on pagination element
  //? can't we use page variable
  const [input, setInput] = useState(1);

  /**
   * updates values to show data from next page
   */
  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };
  /**
   * updates values to show data from previous page
   */
  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };
  /**
   * reset pagination variables (called when new data is fetched)
   */
  const inicio = () => {
    setInput(1);
    setPage(1);
  };

  //! modifications to solve pagination issue
  // <p> de {Math.round(maximo)} </p>
  // disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
  return (
    <Container $bgCategory={bgCategory} $colorCategory={colorCategory}>
      <button onClick={inicio}>
        <span>{<v.icontodos />}</span>
      </button>
      <button disabled={page <= 1} onClick={previousPage}>
        <span className="icon-left">{<v.iconrightarrow />}</span>
      </button>
      <span>{input}</span>
      <p> de {max} </p>
      <button
        disabled={page >= max}
        onClick={nextPage}
      >
        <span>{<v.iconrightarrow />}</span>
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  button {
    background-color: ${(props) => props.$colorCategory};
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 10px 15px -3px ${(props) => props.$colorCategory};
    }
    .icon-left {
      transform: rotate(-180deg);
    }
    span {
      color: #fff;
      display: flex;
      svg {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }

  button[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;