import styled from "styled-components";
import { CalendarioLineal, Header,Tabs,ContentFiltros,Btndesplegable,ListaMenuDesplegable,DataDesplegableMovimientos,useOperaciones,Btnfiltro,v } from "../../index";
import { useState } from "react";
import dayjs from "dayjs";
export function InformesTemplate() {
  const {
    setTipoMovimientos,
    tipo,
    colorCategoria,
    año,
    mes,
    bgCategoria,
    tituloBtnDes,
    tituloBtnDesMovimientos,
  } = useOperaciones(); //! unused imports
  // bool variable to show/hide type category options (income, outcome)
  const [stateTipo, setStateTipo] = useState(false);
  // stores current data or date select by the user to see summary
  const [value, setValue] = useState(dayjs(Date.now()));
  //! this variable is not being used
  const [formatoFecha, setFormatoFecha] = useState("");
  // bool variable to show/hide user options
  const [state, setState] = useState(false);
  /**
   * shows/hides category type options
   */
  function openTipo() {
    // switch category type bool variable
    setStateTipo(!stateTipo);
    // hide user options
    setState(false);
  }
  //! unused function
  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }
  /**
   * setter for movement type selected by user
   * @param {Object} p   category type object (income, outcome)
   */
  function cambiarTipo(p) {
    // set category type
    setTipoMovimientos(p);
    // close category type select options
    //? this one can technically be done by directly setting false
    setStateTipo(!stateTipo);
    // close user options
    setState(false);
  }
  return (
    <Container>
      <header className="header">
        <Header stateConfig={{ state: state, setState: ()=>setState(!state) }} />
      </header>
      <section className="area1">
      <ContentFiltros>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Btndesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDesMovimientos}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableMovimientos}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
        <h1>Informes</h1>
      </section>
      <section className="area2">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}/>
      </section>
      <section className="main">
        <Tabs/>
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 70px
    "main" auto;

  .header {
    grid-area: header;
   // background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    //background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    gap:20px;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content:center;
    padding-bottom:20px;
  }
  .main {
    grid-area: main;
    //background-color: rgba(179, 46, 241, 0.14);
  }
`;
//! unused component declaration
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;